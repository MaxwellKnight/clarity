import { useContext } from 'react';
import { PieChartData } from '../../types/charts.types';
import './categoryBox.css';
import { UIContext } from '../../context';
import { UIState } from '../../types';

type Props = {
 	categories: PieChartData[], 
	colors: string[]
}

const CategoryBox = ({ categories, colors } : Props): JSX.Element => {
	const { lang } = useContext<UIState>(UIContext);

	return (
		<div className="category-box">
			{categories.map((category: PieChartData, index: number) => (
				<div className="category" key={colors[index]}>
					<span className='category-box' style={{backgroundColor: colors[index]}}></span>
					<p>{category[`category_${lang.lang}`]}</p>
				</div>
			))}
		</div>
	)
};

export default CategoryBox;