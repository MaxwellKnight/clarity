import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { LangType } from "../types";
import { PieChartData } from "../types";
import '../styles/rechartsCustom.css';

interface CustomLabelProps {
	cx: number,
	cy: number,
	innerRadius: number,
	outerRadius: number,
	midAngle: number,
	percent: number,
	index?: number
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
	lang: LangType;
	data: PieChartData[]
}

export const CustomTooltip = ({
	active,
	payload,
	lang,
	data,
}: CustomTooltipProps) => {
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

export const CustomizedLabel = ({ 
	cx, 
	cy,
	midAngle, 
	innerRadius, 
	outerRadius,
	percent 
}: CustomLabelProps) => {

	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
	return (
	  <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">
		 {percent > 0.02 && `${(percent * 100).toFixed(1)}%`}
	  </text>
	);
 };