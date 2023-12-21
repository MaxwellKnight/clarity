import {useState, useEffect} from 'react';
import { getErrorMessage } from '../../utils';
import { SVGOptions } from '../../types';


/**
 * Custom hook for dynamically fetching and using SVG content based on a provided name.
 *
 * @param {string} name - The name of the SVG file to fetch.
 * @param {SVGOptions} options - Additional options for handling the SVG fetch.
 * @returns {Object} - An object containing error state, loading state, and SVG content.
 */
export const useDynamicSVG = (name: string, options: SVGOptions = {}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>();
	const [svgContent, setSvgContent] = useState<string | null>(null);

	const {onCompleted, onError} = options;
	useEffect(() => {
		const fetchSVG = async () => {
		  try {
			 const response = await fetch(`/icons/${name}`);
			 if (!response.ok) {
				throw new Error(`Failed to fetch SVG: ${response.status}`);
			 }
			 const svgText = await response.text();
			 setSvgContent(svgText);
			 setLoading(false);
			 if (onCompleted) onCompleted(name, svgText);
		  } catch (error) {
			 const message = getErrorMessage(error);
			 setError(message);
			 setLoading(false);
			 onError && onError(message);
		  }
		};
		fetchSVG();
	 }, [name, onCompleted, onError]);

	return {error, loading, SVGContent: svgContent}
}