import { ResponsiveContainer, XAxis, Tooltip, Bar, LabelList, Area, ComposedChart } from 'recharts';
import './barBox.css';
import { CustomTooltip } from '../../../utils/recharts.utils';

type BarBoxData = {
	name: string,
	value: number,
	fill?: string,
	avg?: string | number
}
type BarBoxProps = {
	data: BarBoxData[],

}
const BarBox = ({ data }: BarBoxProps) => {
	return ( data &&
		<div className="bar-box">
			<ResponsiveContainer width="100%" minHeight={300}>
				{/* sorted: data.sort((a, b) => b.value - a.value) */}
				<ComposedChart data={data} {...{overflow: "visible"}}> 
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
					<Area type="monotone" dataKey="avg" stroke="#ffffff79" fill="#1eff7c70"  dot={false} strokeWidth={5}/>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	)
};

export default BarBox;