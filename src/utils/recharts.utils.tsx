import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import '../styles/rechartsCustom.css';
import { useTranslation } from "react-i18next";
import { PieChartEntry } from "../types";

interface CustomPieChartLabelProps {
	cx: number,
	cy: number,
	innerRadius: number,
	outerRadius: number,
	midAngle: number,
	percent: number,
	index?: number
}

interface CustomTooltipPie  {
	data: PieChartEntry[]
}

type CustomTooltip = TooltipProps<ValueType, NameType> 

type CustomPieTooltiProps = TooltipProps<ValueType, NameType> & CustomTooltipPie;

export const CustomPieChartTooltip = ({
	active,
	payload,
	data,
}: CustomPieTooltiProps) => {
	const { t } = useTranslation();
	if (active && payload) {
		const category: PieChartEntry | undefined = data.find((category) => category.name === payload[0].payload.name);
		return (
			<div className="custom-tooltip">
				<p className="label">{`${category && t(`translation:categories.${category.name}`)}`}</p>
				<p className="desc">{category && category.value}</p>
			</div>
		);
	}
	return null;
};

export const CustomizedPieChartLabel = ({ 
	cx, 
	cy,
	midAngle, 
	innerRadius, 
	outerRadius,
	percent 
}: CustomPieChartLabelProps) => {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 1.8;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
	return (
	  <text className='none' x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">
		 {percent > 0.02 && `${(percent * 100).toFixed(1)}%`}
	  </text>
	);
 };


 export const CustomCheckingTooltip = ({
	active,
	payload,
}: CustomTooltip) => {

	const { t } = useTranslation();

	if (active && payload) {
		const data = payload[0];
		const incomeColor = payload[0].color;
		const expensesColor = payload[1].color;
		const savingsColor = payload[2].color;
		return (
			<div className="custom-tooltip">
				<div className="checking">
					<div className="checking-item">
						<span 
							className="checking-title" 
							style={{color: incomeColor}}>
									{t(`translation:net_income`)}
						</span>
						<span>{data.payload.income}</span>
					</div>
					<div className="checking-item">
						<span 
							className="checking-title" 
							style={{color: expensesColor}}>
								{t(`translation:expenses`)}
						</span>
						<span>{data.payload.expenses}</span>
					</div>
					<div className="checking-item">
						<span 
							className="checking-title" 
							style={{color: savingsColor}}>
								{t(`translation:savings`)}
						</span>
						<span>{data.payload.saving}</span>
					</div>
				</div>
			</div>
		);
	}
	return null;
};

export const CustomChartTooltip = ({
	active,
	payload,
}: CustomTooltip) => {
	if (active && payload) {
		return (
			<div className="custom-tooltip">
				<span className="custom-chart-tooltip">{payload[0].payload.amount}</span>
			</div>
		);
	}
	return null;
};