import { ResponsiveContainer, BarChart, XAxis, Tooltip, Bar, LabelList } from 'recharts';
import './barBox.css';
import { CustomTooltip } from '../../../utils/recharts.utils';

type BarBoxData = {
	name: string,
	value: number,
	fill?: string,
}
type BarBoxProps = {
	data: BarBoxData[]
}
const BarBox = ({ data }: BarBoxProps) => {
	return (
		<div className="bar-box">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data} {...{overflow: "visible"}}>
					<XAxis 
						dataKey="name" 
						axisLine={false} 
						tickLine={true} 
						height={95}
						angle={-65}
						dx={-15}
						dy={45}
						padding={"gap"}
						interval={0} 
						tick={{fill: '#c3c3c3'}}
					/>
					<Tooltip content={<CustomTooltip />}/>
					<Bar dataKey="value" fill="#E07A5F">
						<LabelList dataKey="value" position="top"/>
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
};

export default BarBox;