import { ResponsiveContainer, Line, XAxis,YAxis, CartesianGrid, Tooltip, ComposedChart } from "recharts";
import { generateColors, GenericTooltip, MONTH_DICT } from "../../utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Table, Tag } from "../../componenets";
import { TFunction } from "i18next";
import { useFetch } from "../../hooks";
import './_categorySection.css';

type Option = { label: string, value: string };
type Expense = { date: Date, expense: number};
type CategoryExpenses = { category: string, expenses: Expense[] };
type ExpensesGraph = { [key: string]: number | string };

const MAX_COLORS = 22;
const colors = generateColors(MAX_COLORS);

/**
 * @param categoris - array of strings
 * @returns - parsed array of objects for ReCharts
 */
const parseCategories = (categoris: string[], t: TFunction<"translation", undefined>): Option[] => 
	categoris.map(category => ({
		label: t(`translation:${category === "empty" ? "category" : `categories.${category}`}`), 
		value: category
}))

/**
 * 
 * @param data - fetched data from endpoint
 * @param graph - current graph state
 * @returns new graph state 
 */
const parseCategoryExpenses = (data: CategoryExpenses | undefined | null, graph: ExpensesGraph[] | [] | undefined = [], t: TFunction<"translation", undefined>) =>  {
	if(!data) return graph;

	const { category, expenses } = data;
	for(let i = 0; i < expenses.length; i++){
		graph[i] = {
			...graph[i],
			month: t(`translation:months_full.${MONTH_DICT[new Date(expenses[i].date).getMonth()]}`),
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
		const selectedOption = options.find(({value: optionValue}) => optionValue === value) || null;
		setSelectedCategory(selectedOption);
	}

	const removeGraph = (category: string) => {
		const newGraph = graph.map(month => {
			const { [category]: removedCategory, ...updatedMonth } = month;
			return updatedMonth;
		 });
	 
		const option = renderOptions.find(op => op.value === category);
	 
		if (option) {
		  const newOptions = [...options, option];
		  const newRenderOptions = renderOptions.filter(op => op.value !== category);
		  setSelectedCategory(null);
		  
		  setGraph([...newGraph]);
		  setOptions(newOptions);
		  setRenderOptions(newRenderOptions);
		}
	 };

	useEffect(() => {
		if(!loading && graphData){
			const newGraph = parseCategoryExpenses(graphData, graph, t);
			const newOptions = options.filter((option: Option) => option.value !== graphData.category);
			const removedOption = options.find((option: Option) => option.value === graphData.category);
			if(removedOption) setRenderOptions((prev) => [...prev, removedOption]);
			setSelectedCategory(null);
			setOptions(newOptions);
			setGraph(newGraph);
		}
	}, [selectedCategory, graphData]);

	useEffect(() => {
		if(categories && !categories.includes("empty")){
			categories.unshift("empty");
			setOptions(() => parseCategories(categories, t));
		}
	}, [categories]);

	return (
		<section className="category-section">
			<div className="category-section-info">
				<h2>{t(`translation:annual_summary`)}</h2>
			</div>
			<Dropdown options={options} onClick={handleCategoryChange}/>
			<div className="tags-section">
				{renderOptions.map((option: Option, i: number) => 
					<Tag key={option.label} action={() => removeGraph(option.value)} color={colors[i]} label={t(`translation:categories.${option.value}`)}/>
				)}
			</div>
			<ResponsiveContainer key={JSON.stringify(graph)} width="90%" height="99%">
				<ComposedChart width={500} height={300} data={graph} >
					<CartesianGrid strokeDasharray="10 10"/>
					<Tooltip content={<GenericTooltip />}/>
					<YAxis width={50} tickFormatter={(num) => '₪' + new Intl.NumberFormat('en').format(Number(num))}/>
					<XAxis dataKey="month" scale="auto" height={95} dy={10} tick={{fill: '#c3c3c3'}} />
					{renderOptions.map((option: Option, i: number) => 
						<Line key={option.value} type="monotone" dataKey={option.value} fill={colors[i]} stroke={colors[i]} strokeWidth={5} />
					)}
				</ComposedChart>	
			</ResponsiveContainer>
			<Table caption={t(`translation:categories_table`)} content={graph} rowKey='month'/>
		</section>
	)
}

export default CategorySection;