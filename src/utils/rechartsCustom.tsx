import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { LangType } from "../types";
import { PieChartData } from "../types";
import { pieChartData } from "../data/pie_chart.data";

interface CustomLabel {
	cx: number,
	cy: number,
	innerRadius: number,
	outerRadius: number,
	midAngle: number,
	percent: number,
	index?: number
}

interface CustomToolipProps extends TooltipProps<ValueType, NameType> {
	lang: LangType["lang"]
}

export const CustomTooltip = ({
	active,
	payload,
	label,
	lang,
}: CustomToolipProps) => {
	if (active && payload) {
		const category: PieChartData | undefined = pieChartData.find((category) => category.category_en === payload[0].payload.name);

		return (
			<div className="custom-tooltip">
			<p className="label">{`${label} : ${category && category[`category_${lang}`]}`}</p>
			<p className="desc">Anything you want can be displayed here.</p>
			</div>
		);
	}
	return null;
};

export const renderCustomizedLabel = ({ 
	cx, 
	cy,
	midAngle, 
	innerRadius, 
	outerRadius,
	percent 
}: CustomLabel) => {

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