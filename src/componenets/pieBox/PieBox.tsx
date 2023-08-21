import { PieChart, Pie, Cell } from 'recharts';
import './pieBox.css';
import { PieChartData, PieChartEntry } from '../../types';

type Props = { 
	colors: string[], 
	categories: PieChartData[] 
};

const PieBox = ({ colors, categories }: Props): JSX.Element => {
	const data: PieChartEntry[] = categories.map((category) => ({
		name: category.category_en,
		value: category.amount
	}))
	
	return(
		<div className="pie-box">
			<div className="pie">
				<PieChart width={400} height={400}>
					<Pie
						data={data}
						cx={200}
						cy={200}
						innerRadius={100}
						outerRadius={180}
						fill="#8884d8"
						paddingAngle={0}
						dataKey="value"
					>
						{data.map((_entry, index) => (
							<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
						))}
					</Pie>
				</PieChart>
			</div>
		</div>
	)
}

export default PieBox