import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import {  LangType } from "../types";
import { PieChartData } from "../types";
import { checkingTooltipData } from "../data/checking_box.data";
import '../styles/rechartsCustom.css';

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
	lang: LangType;
	data: PieChartData[]
}

interface CustomTooltipChecking  {
	lang: LangType;
}

interface CustomTooltip extends TooltipProps<ValueType, NameType>  {
	lang: LangType,
}

type CustomPieTooltiProps = TooltipProps<ValueType, NameType> & CustomTooltipPie;
type CustomCheckingTooltiProps = TooltipProps<ValueType, NameType> & CustomTooltipChecking;

export const CustomPieChartTooltip = ({
	active,
	payload,
	lang,
	data,
}: CustomPieTooltiProps) => {
	if (active && payload) {
		const label: PieChartData | undefined = data.find((label) => label.category_en === payload[0].payload.name);

		return (
			<div className="custom-tooltip" dir={lang.dir}>
				<p className="label">{`${label && label[`category_${lang.lang}`]}`}</p>
				<p className="desc">{label && label.amount}</p>
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
	lang,
}: CustomCheckingTooltiProps) => {
	if (active && payload) {
		const data = payload[0];
		const incomeColor = payload[0].color;
		const expensesColor = payload[1].color;
		const savingsColor = payload[2].color;
		return (
			<div className="custom-tooltip" dir={lang.dir}>
				<div className="checking">
					<div className="checking-item">
						<span className="checking-title" style={{color: incomeColor}}>{checkingTooltipData[`income_${lang.lang}`]}</span>
						<span>{data.payload.income}</span>
					</div>
					<div className="checking-item">
						<span className="checking-title" style={{color: expensesColor}}>{checkingTooltipData[`expenses_${lang.lang}`]}</span>
						<span>{data.payload.expenses}</span>
					</div>
					<div className="checking-item">
						<span className="checking-title" style={{color: savingsColor}}>{checkingTooltipData[`saving_${lang.lang}`]}</span>
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
	lang,
}: CustomTooltip) => {
	if (active && payload) {
		return (
			<div className="custom-tooltip" dir={lang.dir}>
				<span className="custom-chart-tooltip">{payload[0].payload.amount}</span>
			</div>
		);
	}
	return null;
};