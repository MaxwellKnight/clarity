import { useEffect, useState } from "react";
import { Dropdown } from "../../componenets";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { useFetch } from "../../hooks";
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts";
import { generateColors, GenericTooltip, MONTH_DICT } from "../../utils";
import './_categorySection.css';

type Option = { label: string, value: string };
type Expense = { date: Date, expense: number};
type CategoryExpenses = { category: string, expenses: Expense[] };
type ExpensesGraph = { [key: string]: number | string | Date };

const MAX_COLORS = 22
const colors = generateColors(MAX_COLORS);


/**
 * @param categoris - array of strings
 * @returns - parsed array of objects for ReCharts
 */
const parseCategories = (categoris: string[], t: TFunction<"translation", undefined>) => categoris.map(category => {
	return {
		label: t(`translation:categories.${category}`),
		value: category
	}
})

/**
 * 
 * @param data - fetched data from endpoint
 * @param graph - current graph state
 * @returns new graph state 
 */
const parseCategoryExpenses = (data: CategoryExpenses | undefined | null, graph: ExpensesGraph[] | [] | undefined = []) =>  {
	if(!data) return graph;

	const { category, expenses } = data;
	for(let i = 0; i < expenses.length; i++){
		graph[i] = {
			...graph[i],
			date: MONTH_DICT[new Date(expenses[i].date).getMonth()],
			[category]: expenses[i].expense
		}
	}
	return [...graph];
}

type CategorySectionProps = {
	categories: string[]
}
const CategorySection = ({ categories }: CategorySectionProps) => {
	const { t } = useTranslation();
	const [graph, setGraph] = useState<ExpensesGraph[]>([]);
	const [options, setOptions] = useState<Option[]>([]);
	const [renderOptions, setRenderOptions] = useState<Option[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
	const {data: graphData, loading} = useFetch<CategoryExpenses>(
		`http://localhost:3001/info/budget/category/${selectedCategory && selectedCategory.value}`,
	 	[selectedCategory]
	);
	
	const handleCategoryChange = (value:string)=>{
		const selectedOption = options.find((e: Option) => e.value === value) || null;
		setSelectedCategory(selectedOption);
	}

	useEffect(() => {
		if(!loading && graphData){
			const newGraph = parseCategoryExpenses(graphData, graph);
			const newOptions = options.filter((option: Option) => option.value !== graphData.category);
			const removedOption = options.find((option: Option) => option.value === graphData.category);
			if(removedOption) setRenderOptions((prev) => [...prev, removedOption]);
			setOptions(newOptions);
			setGraph(newGraph);
		}
	}, [selectedCategory, graphData, renderOptions]);

	useEffect(() => {
		if(categories){
			categories.unshift("empty");
			setOptions(() => parseCategories(categories, t))
		}
	}, [categories]);

	return (
		<section className="category-section">
			<Dropdown options={options} onClick={handleCategoryChange}/>
			<ResponsiveContainer width="99%" height="99%">
				<LineChart width={500} height={300} data={graph} >
					<CartesianGrid strokeDasharray="3 3"/>
					<Tooltip content={<GenericTooltip />}/>
					<XAxis 
						dataKey="date" 
						axisLine={false} 
						tickLine={true} 
						height={95}
						angle={-65}
						dx={0}
						dy={45}
						interval={0} 
						tick={{fill: '#c3c3c3'}}
					/>
					{renderOptions.map((option: Option, i: number) => 
						<Line 
							key={option.value} 
							type="monotone" 
							dataKey={option.value} 
							stroke={colors[i]} 
							strokeWidth={3} 
							dot={true}
						/>
					)}
				</LineChart>	
			</ResponsiveContainer>
		</section>
	)
}

export default CategorySection;