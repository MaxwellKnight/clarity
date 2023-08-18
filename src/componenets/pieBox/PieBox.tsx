import { PieChart, Pie, Cell } from 'recharts';
import './pieBox.css';

const data = [
	{ name: 'Group A', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 900 },
	{ name: 'Group D', value: 300 },
	{ name: 'Group D', value: 200 },
	{ name: 'Group D', value: 100 },
	{ name: 'Group D', value: 100 },
	{ name: 'Group D', value: 500 },
	{ name: 'Group D', value: 500 },
	{ name: 'Group D', value: 500 },
	{ name: 'Group D', value: 500 },
	{ name: 'Group D', value: 1100 },
	{ name: 'Group D', value: 1100 },
	{ name: 'Group D', value: 1100 },
	{ name: 'Group D', value: 1100 },
 ];
 const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieBox = (): JSX.Element => {
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
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
				</PieChart>
			</div>
			<div className="pie-box-desc">
			</div>
		</div>
	)
}

export default PieBox