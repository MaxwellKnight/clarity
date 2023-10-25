import { useEffect, useState } from "react";
import { CategoryWidget } from "../../componenets";
import { useFetch } from "../../hooks";
import { FetchResponse } from "../../types";
import { useTranslation } from "react-i18next";
import './_categorySection.css';

type Categories = string[]
type CategoriesFetch = Categories | null | undefined;
type Option = { label: string, value: string };

const CategorySection = () => {
	const { t } = useTranslation();
	const [options, setOptions] = useState<Option[]>([]);
	const { data , loading }: FetchResponse<CategoriesFetch> = useFetch('http://localhost:3001/info/budget/categories');
		
	const parseCategories = (categoris: string[]) => categoris.map(category => ({
		label: t(`translation:categories.${category}`),
		value: category
	}))

	useEffect(() => {
		if(!loading && data){
			data.unshift("empty");
			setOptions(() => parseCategories(data))
		}
	}, [loading, data]) 

	return (
		<section>
			<CategoryWidget options={options} />
		</section>
	)
}

export default CategorySection;