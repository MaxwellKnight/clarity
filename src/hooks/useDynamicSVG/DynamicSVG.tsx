import {useState, useEffect} from 'react';
import { getErrorMessage } from '../../utils';
import { SVGOptions } from '../../types';

export const useDynamicSVG = (name: string, options: SVGOptions = {}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>();
	const [svgContent, setSvgContent] = useState<string | null>(null);

	const {onCompleted, onError} = options;
	useEffect(() => {
		const fetchSVG = async () => {
		  try {
			 const response = await fetch(`../../../public/icons/${name}`);
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