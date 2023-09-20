import { Dropdown } from '../..';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../../hooks';
import { FetchResponse } from '../../../types';
import './categoryWidget.css';
import { useEffect } from 'react';

type Categories = {
	categories: string[]
}
const CategoryWidget = () => {
	const { t } = useTranslation();
	const { data , loading }: FetchResponse<Categories | null | undefined> = 
		useFetch('http://localhost:3001/info/budget/categories');

	useEffect(() => {
		if(!loading && data) data.categories.unshift('empty');
	}, [loading])

	const parseCategories = (categoris: string[]) => categoris.map(category => ({
		label: t(`translation:categories.${category}`),
		value: category
	}))

	return (
		<div className="category-widget">
		{!loading && data && 
			<div className='category-widget'>
				<Dropdown label={t("translation:category")} options={parseCategories(data.categories)} />
				<Dropdown options={parseCategories(data.categories)} />
				<Dropdown options={parseCategories(data.categories)} />
				<Dropdown options={parseCategories(data.categories)} />
			</div>
		}
		</div>
	)
}

export default CategoryWidget;