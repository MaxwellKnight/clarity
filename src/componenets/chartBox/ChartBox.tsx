import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { chart_box } from '../../data/chart_box.data';
import { useContext } from 'react';
import { UIContext } from '../../context/UIContext';
import { UIState } from '../../types';
import './chartBox.css';
import { PieChartLabel } from '../../types';

const chartData = [
	{
	  name: 'Page A',
	  uv: 4000,
	  pv: 2400,
	  amt: 2400,
	},
	{
	  name: 'Page B',
	  uv: 3000,
	  pv: 1398,
	  amt: 2210,
	},
	{
	  name: 'Page C',
	  uv: 2000,
	  pv: 9800,
	  amt: 2290,
	},
	{
	  name: 'Page D',
	  uv: 2780,
	  pv: 3908,
	  amt: 2000,
	},
	{
	  name: 'Page E',
	  uv: 1890,
	  pv: 4800,
	  amt: 2181,
	},
	{
	  name: 'Page F',
	  uv: 2390,
	  pv: 3800,
	  amt: 2500,
	}
 ];


const ChartBox = ({ title, label, flux } : { title: "income" | "expense" , label: PieChartLabel, flux: string}): JSX.Element => {
	const { lang } : { lang: UIState["lang"] } = useContext<UIState>(UIContext)
	return (
		<div className="line-chart">
			<div className="chart-info">
				<div className="chart-income">
					<span className="chart-title">{chart_box[`title_${title}_${lang.lang}`]}</span>
					<h2 className="chart-label">{label.amount}</h2>
				</div>
				<div className="chart-desc">
					<span className="percentage" data-type={flux}>{label.percentage}%</span>
					<span className="chart-subdesc">{chart_box[`desc_${lang.lang}`]}</span>
				</div>
			</div>
			<div className="chart">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart width={300} height={100} data={chartData}>
						<Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} dot={false}/>
					</LineChart>
				</ResponsiveContainer>
				
			</div>
		</div>
	)
}

export default ChartBox;