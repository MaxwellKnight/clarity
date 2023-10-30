import { useEffect, useReducer, useState } from "react";
import { DropdownWidget } from "../../componenets";
import { Expense } from "../../types";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { ResponsiveContainer, Line, LineChart } from "recharts";
import { parseExpenses } from "../../utils";
import './_categorySection.css';

type Option = { label: string, value: string };


type GraphState = { [key: string]: Expense[] | null };
type GraphAction = {
	type: string,
	key?: string,
	data?: Expense[] | null
};

/**
 * @param state - current state
 * @param actions - defined action to run
 * @returns - new state
 */
const graphReducer = (state: GraphState, actions: GraphAction): GraphState => {
	switch(actions.type){
		case 'ADD_GRAPH':
			return actions.key ? {
				...state,
				[actions.key]: actions.data || null
			} : {...state}
		case 'REMOVE_GRAPH': 
			return actions.key ? {
				...state,
				[actions.key]: null
			} : {...state}
		default: 
			return {
				...state
			}
	}
}

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

type CategorySectionProps = {
	categories: string[]
}
const CategorySection = ({ categories }: CategorySectionProps) => {
	const { t } = useTranslation();
	const [options, setOptions] = useState<Option[]>([]);
	const [graphs, dispatch] = useReducer(graphReducer, {})

	console.log(graphs);
	/**
	 * @param category - category name
	 * @param key - index of expenses
	 * @returns void
	 */
	const toggleGraph = (category: string) => {
		if(category in graphs){
			dispatch({type: 'REMOVE_GRAPH', key: category});
			return;
		}
		dispatch({type: 'ADD_GRAPH', data: [{isFixed: false, date: new Date(), category, value: Math.floor(Math.random() * 10000)}], key: category});
	}
	
	useEffect(() => {
		if(categories){
			categories.unshift("empty");
			setOptions(() => parseCategories(categories, t))
		}
	}, [categories]) 

	return (
		<section className="category-section">
			<DropdownWidget options={options} dropdownCount={5} action={toggleGraph}/>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart width={500} height={300} data={parseExpenses(graphs[0])} >
					<Line type="monotone" dataKey="value" stroke="#82ca9d" />
				</LineChart>	
			</ResponsiveContainer>
			{/* {Object.keys(graphs).map((key: string) => (
				<LineChart width={500} height={300} data={parseExpenses(graphs[Number(key)])} >
					<Line type="monotone" dataKey="value" stroke="#82ca9d" />
				</LineChart>
			))} */}
		</section>
	)
}

export default CategorySection;