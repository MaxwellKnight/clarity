import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './pieBox.css';
import { PieChartData, PieChartEntry } from '../../types';
import { CustomTooltip, renderCustomizedLabel } from '../../utils';
import { UIContext } from '../../context';
import { useContext } from 'react';

type Props = { 
	colors: string[], 
	categories: PieChartData[],
};

const PieBox = ({ colors, categories }: Props): JSX.Element => {
	const { lang } = useContext(UIContext);

	const data: PieChartEntry[] = categories.map((category) => ({
		name: category.category_en,
		value: category.amount
	}))
	
	return(
		<div className="pie-box">
			<div className="pie">
				<PieChart width={500} height={500}>
					<Pie
						data={data}
						cx={245}
						cy={250}
						innerRadius={100}
						outerRadius={200}
						paddingAngle={0}
						dataKey="value"
						labelLine={false}
						label={renderCustomizedLabel}
					>
						{data.map((_entry, index) => (
							<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
							))}
					</Pie>
					<Tooltip content={<CustomTooltip lang={lang.lang} />}/>
				</PieChart>
			</div>
		</div>
	)
}

export default PieBox