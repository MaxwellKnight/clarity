import { PieChartData } from '../../../types';
import './categoryBox.css';
import { useUIContext } from '../../../context';

type Props = {
 	categories: PieChartData[], 
	colors: string[]
}

const CategoryBox = ({ categories, colors } : Props): JSX.Element => {
	const { lang } = useUIContext();

	return (
		<div className="category-box">
			{categories.map((category: PieChartData, index: number) => (
				<div className="category" key={colors[index]}>
					<span className='category-box' style={{backgroundColor: colors[index]}}></span>
					<p>{category[`category_${lang.lang}`]}</p>
					<p className='category-amount'>({category[`amount`]})</p>
				</div>
			))}
		</div>
	)
};

export default CategoryBox;