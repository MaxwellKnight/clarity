import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import './chartBox.css';
import { PieChartLabel } from '../../../types';
import { CustomChartTooltip } from '../../../utils/recharts.utils';
import { useTranslation } from 'react-i18next';

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

 type ChartBoxProps = {
	title: "income" | "expenses",
	label: PieChartLabel,
	flux: string
 }

const ChartBox = ({ title, label, flux } : ChartBoxProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<div className="line-chart">
			<div className="chart-info">
				<div className="chart-income">
					<span className="chart-title">{t(`translation:${title}`)}</span>
					<h2 className="chart-label">{label.totalAmount}</h2>
				</div>
				<div className="chart-desc">
					<span className="percentage" data-type={flux}>{label.percentage}%</span>
					<span className="chart-subdesc">{t('translation:compared_to_last_month')}</span>
				</div>
			</div>
			<div className="chart">
				<ResponsiveContainer width="99%" height="99%">
					<LineChart width={100} height={100} data={chartData}>
						<Tooltip 
							content={<CustomChartTooltip />}
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