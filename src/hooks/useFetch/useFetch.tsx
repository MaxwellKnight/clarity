import { useEffect, useReducer, useRef } from "react";
import fetchReducer, { initial_fetch } from "./reducer";

type Cache<T> = { [url: string]: T };

const DEFAULT_OPTIONS = {
	method: 'GET',
	headers: { "Content-Type": "application/json" }
}

const useFetch = <T,>(url: string , options = {},dependencies: unknown[] = []) => {
	const [{ data, loading, error}, dispatch] = useReducer(fetchReducer<T>, initial_fetch);
	const cache = useRef<Cache<T>>({});
	const cancelRequest = useRef<boolean>(false);

	useEffect(() => {
		const getUrl = async (url: string) => {
			dispatch({type: 'FETCH_START'});
			if(cache.current[url]){
				dispatch({type: 'FETCH_SUCCESS', data: cache.current[url]});
				return;
			}
			try{
				const response = await fetch(url, {...DEFAULT_OPTIONS, ...options});
				if(!response.ok) throw new Error(response.statusText);
				const responseData = (await response.json()) as T;
				cache.current[url] = responseData;

				dispatch({type: 'FETCH_SUCCESS', data: cache.current[url]});
			}catch(error){
				if(cancelRequest.current) return;
				dispatch({type: 'FETCH_FAILURE', error: error as Error})
			}
		}

		getUrl(url);

		return () => {
			cancelRequest.current = true;
		}
		
	}, dependencies);

	const reFetch = async () => {
		if(typeof url !== 'string') return;
		if(cache.current[url]){
			dispatch({type: 'FETCH_SUCCESS', data: cache.current[url]});
			return;
		}
		try{
			const response = await fetch(url);
			if(!response.ok) throw new Error(response.statusText);
			const data = (await response.json()) as T;
			cache.current[url] = data;

			if(cancelRequest.current) return;
			dispatch({type: 'FETCH_SUCCESS', data});
		}catch(error){
			dispatch({type: 'FETCH_FAILURE', error: error as Error})
		}
	}

	return { data, loading, error, reFetch };
}

export default useFetch;