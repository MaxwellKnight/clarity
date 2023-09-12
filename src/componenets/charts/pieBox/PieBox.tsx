import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './pieBox.css';
import { PieChartData, PieChartEntry } from '../../../types';
import { CustomPieChartTooltip, CustomizedPieChartLabel } from '../../../utils';
import { useUIContext } from '../../../context';

type PieBoxProps = { 
	colors: string[], 
	categories: PieChartData[],
};

const PieBox = ({ colors, categories }: PieBoxProps): JSX.Element => {
	const { lang } = useUIContext();

	const data: PieChartEntry[] = categories.map((category) => ({
		name: category.category_en,
		value: category.amount
	}))
	
	return(
		<div className="pie-box">
			<div className="pie">
				<ResponsiveContainer width="99%" height={400}>
					<PieChart>
						<Pie
							data={data}
							paddingAngle={0}
							innerRadius={80}
							outerRadius={120}
							dataKey="value"
							labelLine={false}
							label={CustomizedPieChartLabel}
							>
							{data.map((_entry, index) => (
								<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
								))}
						</Pie>
						<Tooltip content={<CustomPieChartTooltip lang={lang} data={categories}/>}/>
					</PieChart>
					</ResponsiveContainer>
			</div>
		</div>
	)
}

export default PieBox