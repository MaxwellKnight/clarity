import { ResponsiveContainer, BarChart, XAxis, Tooltip, Bar } from 'recharts';
import './barBox.css';

type BarBoxData = {
	name: string,
	value: number
}
type BarBoxProps = {
	data: BarBoxData[]
}
const BarBox = ({ data }: BarBoxProps) => {
	console.log(data);
	return (
		<div className="bar-box">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data}>
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
					<Tooltip />
					<Bar dataKey="value" fill="#E07A5F" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
};

export default BarBox;