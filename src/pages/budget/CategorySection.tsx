import { ResponsiveContainer, Line, XAxis,YAxis, CartesianGrid, Tooltip, ComposedChart } from "recharts";
import { generateColors, GenericTooltip, MONTH_DICT } from "../../utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Table, Tag } from "../../componenets";
import { TFunction } from "i18next";
import { useFetch, useLocalStorage } from "../../hooks";
import './_categorySection.css';

type Option = { label: string, value: string };
type Expense = { date: Date, expense: number};
type CategoryExpenses = { category: string, expenses: Expense[] };
type ExpensesGraph = { [key: string]: number | string };
type TranslationFunction = TFunction<"translation", undefined>;

const MAX_COLORS = 22;
const colors = generateColors(MAX_COLORS);

/**
 * Parses an array of category strings into an array of objects suitable for ReCharts options.
 *
 * @param { string[] } cetegories - Array of strings representing categories.
 * @param { TranslationFunction } t - Translation function for i18n.
 * @returns { Option[] } - Parsed array of objects for ReCharts options.
 */
const parseCategories = (cetegories: string[], t: TranslationFunction): Option[] => 
	cetegories.map(category => ({
		label: t(`translation:${category === "empty" ? "category" : `categories.${category}`}`), 
		value: category
}))

/**
 * Parses category expenses data and updates the graph state for the ComposedChart component.
 *
 * @param { CategoryExpenses } data - Fetched data from the endpoint containing category expenses.
 * @param { ExpensesGraph } graph - Current graph state.
 * @param { TranslationFunction } t - Translation function for i18n.
 * @returns { ExpensesGraph[] } - New graph state for the ComposedChart component.
 */
const parseCategoryExpenses = (data: CategoryExpenses | undefined | null, graph: ExpensesGraph[] | [] | undefined = [], t: TranslationFunction): ExpensesGraph[] =>  {
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
	const [graph, setGraph] = useLocalStorage<ExpensesGraph[]>('graph', []);
	const [options, setOptions] = useState<Option[]>([]);
	const [renderOptions, setRenderOptions] = useLocalStorage<Option[]>('options', []);
	const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
	const {data: graphData, loading} = useFetch<CategoryExpenses>(
		`http://localhost:3001/info/budget/category/${selectedCategory && selectedCategory.value}`,
		{},
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
		if (!option) return;

		const newOptions = [...options, option];
		const newRenderOptions = renderOptions.filter(op => op.value !== category);
		setSelectedCategory(null);
		
		setGraph(newGraph);
		setOptions(newOptions);
		setRenderOptions(newRenderOptions);
	 };

	useEffect(() => {
		if(loading || !graphData) return;

		const newGraph = parseCategoryExpenses(graphData, graph, t);
		const newOptions = options.filter((option: Option) => option.value !== graphData.category);
		const removedOption = options.find((option: Option) => option.value === graphData.category);

		if(removedOption) setRenderOptions((prev: Option[]) => [...prev, removedOption]);
		setSelectedCategory(null);
		setOptions(newOptions);
		setGraph(newGraph);

	}, [selectedCategory, graphData]);

	useEffect(() => {
		if(!categories || categories.includes("empty")) return;
		categories.unshift("empty");
		setOptions(() => parseCategories(categories, t));

	}, [categories]);

	return (
		<section className="category-section">
			<div className="category-section-info">
				<h2>{t(`translation:annual_summary`)}</h2>
			</div>
			<Dropdown options={options} onClick={handleCategoryChange} />
			<div className="tags-section">
				{renderOptions.map((option: Option, i: number) => 
					<Tag key={option.label} action={() => removeGraph(option.value)} color={colors[i]} label={t(`translation:categories.${option.value}`)}/>
				)}
			</div>
			{renderOptions.length > 0 ? <>
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
			</> : null}
		</section>
	)
}

export default CategorySection;