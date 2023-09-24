import { Dropdown } from '../..';
import { useFetch } from '../../../hooks';
import { FetchResponse } from '../../../types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './categoryWidget.css';

type Option = { label: string, value: string } [];
type Categories = { categories: string[] }
type CategoriesFetch = Categories | null | undefined;

const CategoryWidget = () => {
	const { t } = useTranslation();
	const [options, setOptions] = useState<Option>([]);
	const { data , loading }: FetchResponse<CategoriesFetch> = useFetch('http://localhost:3001/info/budget/categories');
	
	const parseCategories = (categoris: string[]) => categoris.map(category => ({
		label: t(`translation:categories.${category}`),
		value: category
	}))
	
	useEffect(() => {
		if(!loading && data){
			data.categories.unshift("empty");
			setOptions(() => parseCategories(data.categories))
		}
	}, [loading]) 

	return (
		<div className="category-widget">
		{!loading ?
			<div className='category-widget'>
				<Dropdown label={t("translation:category")} options={options} />
				<Dropdown options={options} />
				<Dropdown options={options} />
				<Dropdown options={options} />
			</div> : null
		}
		</div>
	)
}

export default CategoryWidget;