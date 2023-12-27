/**
 * Module for defining custom components, functions, and constants related to Recharts, a charting library for React.
 * @module RechartsModuleUtils
 */

import { Sector, TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { useTranslation } from "react-i18next";
import { Expense, PieChartEntry } from "../types";
import { generateColors } from ".";
import { t } from "i18next";
import '../styles/recharts.css';

/**
 * Maximum number of colors used for chart elements.
 * @constant { number }
 */
const MAX_COLORS = 23;

/**
 * Array of generated colors for chart elements.
 * @constant { string[] }
 */
const COLORS = generateColors(MAX_COLORS);

/**
 * Props for the CustomPieChartLabel component.
 * @typedef {Object} CustomPieChartLabelProps
 * @property { number } cx - The x-coordinate of the center of the pie chart.
 * @property { number } cy - The y-coordinate of the center of the pie chart.
 * @property { number } innerRadius - The inner radius of the pie chart.
 * @property { number } outerRadius - The outer radius of the pie chart.
 * @property { number } midAngle - The middle angle of the pie chart segment.
 * @property { number } percent - The percentage of the pie chart segment.
 * @property { number } [index] - The index of the pie chart segment.
 */

/**
 * Props for the CustomTooltipPie component.
 * @typedef { Object } CustomTooltipPie
 * @property { PieChartEntry[] } data - Array of pie chart entries.
 */

/**
 * Props for the CustomTooltip component.
 * @typedef { Object } CustomTooltip
 * @property { boolean } active - Indicates whether the tooltip is active.
 * @property { object } payload - Payload object containing tooltip data.
 */

/**
 * Combined props for the CustomPieChartTooltip component.
 * @typedef { CustomTooltip & CustomTooltipPie } CustomPieTooltiProps
 */

/**
 * Payload structure for the ActiveShapePayload type.
 * @typedef { Object } ActiveShapePayload
 * @property { string | number } - Key-value pairs representing data for an active shape.
 */

/**
 * Props for the RenderActiveShape component.
 * @typedef { Object } RenderActiveShapeProps
 * @property { number } cx - The x-coordinate of the center of the chart.
 * @property { number } cy - The y-coordinate of the center of the chart.
 * @property { number } midAngle - The middle angle of the chart segment.
 * @property { number } innerRadius - The inner radius of the chart.
 * @property { number } outerRadius - The outer radius of the chart.
 * @property { number } startAngle - The start angle of the chart segment.
 * @property { number } endAngle - The end angle of the chart segment.
 * @property { string } fill - The fill color of the chart segment.
 * @property { ActiveShapePayload } payload - Payload object for the active shape.
 * @property { number } percent - The percentage of the chart segment.
 * @property { number } value - The value of the chart segment.
 * @property { string } label - The label for the chart segment.
 */


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

type CustomTooltip = TooltipProps<ValueType, NameType> & { translation?: string };

type CustomPieTooltiProps = TooltipProps<ValueType, NameType> & CustomTooltipPie;

type ActiveShapePayload = {
	[key: string]: string | number
 }
 type RenderActiveShapeProps = {
	cx: number,
	cy: number,
	midAngle: number,
	innerRadius: number,
	outerRadius: number,
	startAngle: number,
	endAngle: number,
	fill: string,
	payload: ActiveShapePayload,
	percent: number,
	value: number,
	label: string
}


 /**
 * Custom component for rendering the tooltip of a pie chart.
 *
 * @param {CustomPieTooltiProps} props - Props for the component.
 * @returns {React.ReactNode} - Rendered tooltip component.
 */
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


/**
 * Custom component for rendering labels in a pie chart.
 *
 * @param { CustomPieChartLabelProps } props - Props for the component.
 * @returns { React.ReactNode } - Rendered label component.
 */
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

/**
 * Custom component for rendering a tooltip for a checking component.
 *
 * @param { CustomTooltip } props - Props for the component.
 * @returns { React.ReactNode } - Rendered tooltip component.
 */
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
						<span className="checking-title" style={{color: incomeColor}}>{t(`translation:net_income`)}</span>
						<span>{data.payload.income}</span>
					</div>
					<div className="checking-item">
						<span className="checking-title" style={{color: expensesColor}}>{t(`translation:expenses`)}</span>
						<span>{data.payload.expenses}</span>
					</div>
					<div className="checking-item">
						<span className="checking-title" style={{color: savingsColor}}>{t(`translation:savings`)}</span>
						<span>{data.payload.saving}</span>
					</div>
				</div>
			</div>
		);
	}
	return null;
};

/**
 * Custom component for rendering a tooltip for a chart component.
 *
 * @param { CustomTooltip } props - Props for the component.
 * @returns { React.ReactNode } - Rendered tooltip component.
 */
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

/**
 * Function to render an active shape in a pie chart.
 *
 * @param { RenderActiveShapeProps } props - Props for the function.
 * @returns { React.ReactNode } - Rendered active shape component.
 */
export const renderActiveShape = ({
	cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, label 
}: RenderActiveShapeProps) => {

	const RADIAN = Math.PI / 180;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 40) * cos;
	const my = cy + (outerRadius + 45) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 50;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';
 
	return (
	  <g>
		 <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#ffff" style={{letterSpacing: "1px"}}>
			{payload.name}
		 </text>
		 <Sector
			cx={cx}
			cy={cy}
			innerRadius={innerRadius}
			outerRadius={outerRadius}
			startAngle={startAngle}
			endAngle={endAngle}
			fill={fill}
		 />
		 <Sector
			cx={cx}
			cy={cy}
			startAngle={startAngle}
			endAngle={endAngle}
			innerRadius={outerRadius + 6}
			outerRadius={outerRadius + 10}
			fill={fill}
		 />
		 <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
		 <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
		 <text x={ex + (cos >= 0 ? 1 : -1) * 30} y={ey - 25} textAnchor={textAnchor} fill="#ffff">{`${label} - ₪${formatNumber(value)}`}</text>
		 <text x={ex + (cos >= 0 ? 1 : -1) * 30} y={ey - 25} dy={18} textAnchor={textAnchor} fill="#bbbbbb">
			{`(${(percent * 100).toFixed(1)}%)`}
		 </text>
	  </g>
	);
};

/**
 * Custom component for rendering a generic tooltip.
 *
 * @param { CustomTooltip } props - Props for the component.
 * @returns { React.ReactNode } - Rendered tooltip component.
 */
export const CustomTooltip = ({ active, payload } : CustomTooltip) => {
	const { t } = useTranslation();

	if (active && payload) {
		return (
			<div className="custom-tooltip">
				<p className="label">{payload[0].payload.name}</p>
				<p className="desc">₪{formatNumber(payload[0].payload.value)}</p>
				<p className="label">{t('translation:annual_average')}</p>
				<p className="desc">₪{formatNumber(payload[1].payload.avg)}</p>
			</div>
		);
	}

} 

/**
 * Custom component for rendering a generic tooltip with multiple data points.
 *
 * @param { CustomTooltip } props - Props for the component.
 * @returns { React.ReactNode } - Rendered tooltip component.
 */
export const GenericTooltip = ({ active, payload } : CustomTooltip) => {
	const { t } = useTranslation();
	if (active && payload) {
		return (
			<div className="custom-tooltip generic">
				{payload.map((element, index) => 
					<p key={index}>
						<span style={{color: element.color}}>{t(`translation:categories.${element.dataKey}`)}</span><span> ₪{formatNumber(Number(element.value))}</span>
					</p>
				)}
			</div>
		);
	}
}

/**
 * Function to parse expense data into a format suitable for pie charts.
 *
 * @param { Expense[] | null } expenses - Array of expense data.
 * @param { Expense[] } [ total ] - Array of total expense data.
 * @param { string } [ label ] - Label for the chart segment.
 * @returns { PieChartEntry[] } - Parsed array of pie chart entries.
 */
export const parseExpenses = (expenses: Expense[] | null, total?: Expense[], label?: string) => { 
	return expenses ? expenses.map((expense, index) => {
		const found = total?.find((exp) => exp.category === expense.category)
		return {
			name: t(`translation:categories.${expense.category}`),
			value: Number(expense.value.toFixed(1)),
			fill: COLORS[index],
			label: label,
			avg: found ? found.value / 12 : 0,
		}
	}) : []
}

/**
 * Function to format a number with appropriate suffix (B, M) for large values.
 *
 * @param { number | string } num - Number to be formatted.
 * @returns { string } - Formatted number with appropriate suffix.
 */
export const formatNumber = (num: number | string): string => {
	const billion = 1000000000;
	const million = 1000000;
 
	if (Number(num) >= billion || Number(num) <= -billion) {
	  // Convert to billions
	  return (Number(num) / billion).toFixed(2) + 'B';
	} else if (Number(num) >= million || Number(num) <= -million) {
	  // Convert to millions
	  return (Number(num) / million).toFixed(2) + 'M';
	} else {
	  // Leave as is
	  return new Intl.NumberFormat('en').format(Number(num));
	}
 }

export const MONTH_DICT: { [key: number]: string } = {
	0: 'JAN',
	1: 'FEB',
	2: 'MAR',
	3: 'APR',
	4: 'MAY',
	5: 'JUN',
	6: 'JUL',
	7: 'AUG',
	8: 'SEP',
	9: 'OCT',
	10: 'NOV',
	11: 'DEC'
}