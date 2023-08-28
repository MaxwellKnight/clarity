import { PieChart, Pie, Cell } from 'recharts';
import './pieBox.css';
import { PieChartData, PieChartEntry } from '../../types';

type Props = { 
	colors: string[], 
	categories: PieChartData[] 
};

interface CustomLabelProps {
	cx: number,
	cy: number,
	innerRadius: number,
	outerRadius: number,
	midAngle: number,
	percent: number,
	index?: number
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomLabelProps) => {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
	return (
	  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
		 {percent > 0.02 && `${(percent * 100).toFixed(1)}%`}
	  </text>
	);
 };

const PieBox = ({ colors, categories }: Props): JSX.Element => {
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
				</PieChart>
			</div>
		</div>
	)
}

export default PieBox