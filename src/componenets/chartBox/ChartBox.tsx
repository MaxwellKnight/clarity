import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { chart_box } from '../../data/chart_box.data';
import { useContext } from 'react';
import { UIContext } from '../../context';
import { UIState } from '../../types';
import './chartBox.css';
import { PieChartLabel } from '../../types';
import { CustomChartTooltip } from '../../utils/rechartsCustom';

const chartData = [
	{
	  name: 'Page A',
	  uv: 300,
	  pv: 500,
	  amount: 50,
	},
	{
	  name: 'Page B',
	  uv: 3000,
	  pv: 1398,
	  amount: 500,
	},
	{
	  name: 'Page C',
	  uv: 2000,
	  pv: 9800,
	  amount: 156,
	},
	{
	  name: 'Page D',
	  uv: 2780,
	  pv: 3908,
	  amount: 640,
	},
	{
	  name: 'Page E',
	  uv: 1890,
	  pv: 4800,
	  amount: 100,
	},
	{
	  name: 'Page F',
	  uv: 2390,
	  pv: 3800,
	  amount: 150,
	}
 ];

 type Props = {
	title: "income" | "expense",
	label: PieChartLabel,
	flux: string
 }

const ChartBox = ({ title, label, flux } : Props): JSX.Element => {
	const { lang } = useContext<UIState>(UIContext)
	return (
		<div className="line-chart">
			<div className="chart-info">
				<div className="chart-income">
					<span className="chart-title">{chart_box[`title_${title}_${lang.lang}`]}</span>
					<h2 className="chart-label">{label.totalAmount}</h2>
				</div>
				<div className="chart-desc">
					<span className="percentage" data-type={flux}>{label.percentage}%</span>
					<span className="chart-subdesc">{chart_box[`desc_${lang.lang}`]}</span>
				</div>
			</div>
			<div className="chart">
				<ResponsiveContainer width="99%" height="99%">
					<LineChart width={100} height={100} data={chartData}>
						<Tooltip 
							content={<CustomChartTooltip lang={lang} />}
							position={{x: 0, y: 0}}
						/>
						<Line 
							type="monotone" 
							dataKey="amount" 
							stroke="#8884d8" 
							strokeWidth={2} 
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
				
			</div>
		</div>
	)
}

export default ChartBox;