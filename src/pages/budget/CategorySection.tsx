import { useEffect, useReducer, useState } from "react";
import { DropdownWidget } from "../../componenets";
import { useFetch } from "../../hooks";
import { Expense, FetchResponse } from "../../types";
import { useTranslation } from "react-i18next";
import './_categorySection.css';

type Categories = string[];
type CategoriesFetch = Categories | null | undefined;
type Option = { label: string, value: string };


type GraphState = { [key: number]: Expense | null };
type GraphAction = {
	type: string,
	key?: number,
	data?: Expense
};

const graphReducer = (state: GraphState, actions: GraphAction) => {
	switch(actions.type){
		case 'ADD_GRAPH':
			return {
				...state,
				[`${Object.keys(state).length}`]: actions.data
			}
		case 'REMOVE_GRAPH': 
			if(actions.key){
				return state[actions.key] ? {
					...state,
					[actions.key]: null
				} : 
				{ ...state }
			}
			return { ...state }
		default: 
			return {
				...state
			}
	}
}

const CategorySection = () => {
	const { t } = useTranslation();
	const [options, setOptions] = useState<Option[]>([]);
	const [graphs, dispatch] = useReducer(graphReducer, {})
	const { data , loading }: FetchResponse<CategoriesFetch> = useFetch('http://localhost:3001/info/budget/categories');

	console.log(graphs);
	const parseCategories = (categoris: string[]) => categoris.map(category => ({
		label: t(`translation:categories.${category}`),
		value: category
	}))

	const graphStore = {
		add: (graph: Expense) => dispatch({type: 'ADD_GRAPH', data: graph}),
		remove: (key: number) => dispatch({type: 'REMOVE_GRAPH', key})
	}

	useEffect(() => {
		if(!loading && data){
			data.unshift("empty");
			setOptions(() => parseCategories(data))
		}
	}, [loading, data]) 

	return (
		<section>
			<DropdownWidget options={options} dropdownCount={5} actions={graphStore}/>
		</section>
	)
}

export default CategorySection;