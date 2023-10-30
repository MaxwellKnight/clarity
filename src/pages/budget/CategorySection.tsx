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
	data?: Expense[] | null
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

	const parseCategories = (categoris: string[]) => categoris.map(category => ({
		label: t(`translation:categories.${category}`),
		value: category
	}))

	const toggleGraph = (category: string, key: number) => {
		if(key in graphs){
			dispatch({type: 'REMOVE_GRAPH', key});
			return;
		}
		dispatch({type: 'ADD_GRAPH', data: [{isFixed: false, date: new Date(), category, value: 0}]});
	}
	
	useEffect(() => {
		if(!loading && data){
			data.unshift("empty");
			setOptions(() => parseCategories(data))
		}
	}, [loading, data]) 

	return (
		<section>
			<DropdownWidget options={options} dropdownCount={5} action={toggleGraph}/>
		</section>
	)
}

export default CategorySection;