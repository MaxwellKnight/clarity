import { useEffect, useReducer } from "react";
import fetchReducer, { initial_fetch } from "./reducer";

const useFetch = <T,>(url: string, deps: unknown[] = []) => {
	const [{ data, loading, error}, dispatch] = useReducer(fetchReducer<T>, initial_fetch);

	useEffect(() => {
		const fetchData = async () => {
			try{
				dispatch({type: 'FETCH_START'})
				const response = await fetch(url);
				const data = await response.json();
				if(data) dispatch({type: 'FETCH_SUCCESS', data});
			}catch(error){
				dispatch({type: 'FETCH_FAILURE', error: 'Failed to fetch data'})
			}
		}
		fetchData();
	}, deps);

	const reFetch = async () => {
		try{
			dispatch({type: 'FETCH_START'})
			const response = await fetch(url);
			const data = await response.json();
			if(data) dispatch({type: 'FETCH_SUCCESS', data});
		}catch(error){
			console.log(error);
			dispatch({type: 'FETCH_FAILURE', error: 'Failed to fetch data'})
		}
	}

	return { data, loading, error, reFetch };
}

export default useFetch;