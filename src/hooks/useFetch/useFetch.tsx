import { useEffect, useReducer, useRef } from "react";
import fetchReducer, { initial_fetch } from "./reducer";

type Cache<T> = { [url: string]: T };

const DEFAULT_OPTIONS = {
	method: 'GET',
	headers: { 
		"Content-Type": "application/json" 
	}
};

/**
 * Custom hook for making HTTP fetch requests with caching and state management.
 *
 * @param { string } url - The URL for the fetch request.
 * @param { Object } options - Additional options for the fetch request.
 * @param { Array } dependencies - Dependencies triggering a re-fetch when changed.
 * @returns { Object } - An object containing data, loading state, error, and a function to re-fetch data.
 */
const useFetch = <T,>(url: string , options = {}, dependencies: unknown[] = []) => {
	const [{ data, loading, error}, dispatch] = useReducer(fetchReducer<T>, initial_fetch);
	const cache = useRef<Cache<T>>({}); // Ref for caching responses
	const cancelRequest = useRef<boolean>(false); // Ref to track if the request should be canceled

	/**
	 * Async function to perform the fetch request and update state accordingly.
	 *
	 * @param {string} url - The URL for the fetch request.
	 */
	const getUrl = async (url: string) => {
		dispatch({type: 'FETCH_START'});

		if (cache.current[url]) {
			dispatch({type: 'FETCH_SUCCESS', data: cache.current[url]});
			return;
		}

		try {
			const response = await fetch(url, {...DEFAULT_OPTIONS, ...options});
			if (!response.ok) throw new Error(response.statusText);
			const responseData = (await response.json()) as T;
			cache.current[url] = responseData;
			dispatch({type: 'FETCH_SUCCESS', data: cache.current[url]});
		} catch (error) {
			if (cancelRequest.current) return;
			dispatch({type: 'FETCH_FAILURE', error: error as Error});
		}
	}

	useEffect(() => {
		getUrl(url);

		return () => {
			cancelRequest.current = true;
		}
		
	}, dependencies);

	/**
	 * Function to re-fetch data based on the provided URL.
	 */
	const reFetch = async () => {
		if (typeof url !== 'string') return;

		if (cache.current[url]) {
			dispatch({type: 'FETCH_SUCCESS', data: cache.current[url]});
			return;
		}

		try {
			const response = await fetch(url, {...DEFAULT_OPTIONS, ...options});
			if (!response.ok) throw new Error(response.statusText);
			const data = (await response.json()) as T;

			cache.current[url] = data;

			if (cancelRequest.current) return;
			dispatch({type: 'FETCH_SUCCESS', data});
		} catch (error) {
			dispatch({type: 'FETCH_FAILURE', error: error as Error});
		}
	}
	return { data, loading, error, reFetch };
}

export default useFetch;
