import { ResponsiveContainer, Line, XAxis,YAxis, CartesianGrid, Tooltip, ComposedChart } from "recharts";
import { generateColors, GenericTooltip, MONTH_DICT } from "../../utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Tag } from "../../componenets";
import { TFunction } from "i18next";
import { useFetch } from "../../hooks";
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

	const removeGraph = (category: string) => {
		const newGraph: ExpensesGraph[] = []
		graph.forEach(month => {
			delete month[category];
			newGraph.push({...month});
		})
		const option = renderOptions.find(op => op.value === category);
		if(option){
			const newOptions = [...options, option];
			const newRenderOptions = renderOptions.filter(op => op.value !== category);
			setGraph(newGraph);
			setOptions(newOptions);
			setRenderOptions(newRenderOptions);
		}
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
	}, [selectedCategory, graphData]);

	useEffect(() => {
		if(categories){
			categories.unshift("empty");
			setOptions(() => parseCategories(categories, t));
		}
	}, [categories]);

	return (
		<section className="category-section">
			<Dropdown options={options} onClick={handleCategoryChange}/>
			<div className="tags-section">
				{renderOptions.map((option: Option, i: number) => 
					<Tag key={option.label} action={() => removeGraph(option.value)} color={colors[i]} label={t(`translation:categories.${option.value}`)}/>
				)}
			</div>
			{graphData ? 
				<ResponsiveContainer width="90%" height="99%">
				<ComposedChart width={500} height={300} data={graph} >
					<CartesianGrid strokeDasharray="10 10"/>
					<Tooltip content={<GenericTooltip />}/>
					<YAxis width={50} />
					<XAxis 
						dataKey="date" 
						scale="auto"
						height={95}
						dy={10}
						tick={{fill: '#c3c3c3'}}
					/>
					{renderOptions.map((option: Option, i: number) => 
						<Line 
							key={option.value} 
							type="monotone" 
							dataKey={option.value} 
							fill={colors[i]} 
							stroke={colors[i]} 
							strokeWidth={3} 
						/>
					)}
				</ComposedChart>	
			</ResponsiveContainer> : null}
		</section>
	)
}

export default CategorySection;