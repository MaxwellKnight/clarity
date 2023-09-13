import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './pieBox.css';
import { PieChartEntry } from '../../../types';
import { CustomPieChartTooltip, CustomizedPieChartLabel } from '../../../utils';

type PieBoxProps = { 
	colors?: string[], 
	categories: PieChartEntry[],
};

const PieBox = ({ colors, categories }: PieBoxProps): JSX.Element => {
	
	return(
		<div className="pie-box">
			<div className="pie">
				<ResponsiveContainer width="99%" height={350}>
					<PieChart>
						<Pie
							data={categories}
							paddingAngle={0}
							innerRadius={80}
							outerRadius={120}
							dataKey="value"
							labelLine={false}
							label={CustomizedPieChartLabel}
							>
							{categories.map((_entry, index) => (
								<Cell key={`cell-${index}`} fill={colors && colors[index % colors.length]} />
								))}
						</Pie>
						<Tooltip content={<CustomPieChartTooltip data={categories}/>}/>
					</PieChart>
					</ResponsiveContainer>
			</div>
		</div>
	)
}

export default PieBox