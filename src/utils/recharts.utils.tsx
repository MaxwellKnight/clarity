import { Sector, TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import '../styles/recharts.css';
import { useTranslation } from "react-i18next";
import { Expense, PieChartEntry } from "../types";
import { t } from "i18next";
import { generateColors } from ".";

const MAX_COLORS = 23;
const COLORS = generateColors(MAX_COLORS);


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
		 <text x={ex + (cos >= 0 ? 1 : -1) * 30} y={ey - 25} textAnchor={textAnchor} fill="#ffff">{`${label} - ₪${value}`}</text>
		 <text x={ex + (cos >= 0 ? 1 : -1) * 30} y={ey - 25} dy={18} textAnchor={textAnchor} fill="#bbbbbb">
			{`(${(percent * 100).toFixed(1)}%)`}
		 </text>
	  </g>
	);
 };

 export const CustomTooltip = ({ active, payload } : CustomTooltip) => {
	if (active && payload) {
		return (
			<div className="custom-tooltip">
				<p className="label">{payload[0].payload.name}</p>
				<p className="desc">{payload[0].payload.value}</p>
			</div>
		);
	}
}

export const parseExpenses = (expenses: Expense[] | null, average?: Expense[], label?: string) => { 
	return expenses ? expenses.map((expense, index) => {
		const found = average?.find((exp) => exp.category === expense.category)
		return {
			name: t(`translation:categories.${expense.category}`),
			value: Number(expense.value.toFixed(1)),
			fill: COLORS[index],
			label: label,
			avg: found ? found.value : 0,
		}
	}) : []
}