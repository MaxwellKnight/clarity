import { useTranslation } from 'react-i18next';
import { PieChartEntry } from '../../../types';
import './categoryBox.css';

type CategoryBoxProps = {
 	categories: PieChartEntry[], 
	colors: string[]
}

const CategoryBox = ({ categories, colors } : CategoryBoxProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<div className="category-box">
			{categories.map((category: PieChartEntry, index: number) => (
				<div className="category" key={colors[index]}>
					<span className='category-box' style={{backgroundColor: colors[index]}}></span>
					<p>{t(`translation:categories.${category.name}`)}</p>
					<p className='category-amount'>({category.value})</p>
				</div>
			))}
		</div>
	)
};

export default CategoryBox;