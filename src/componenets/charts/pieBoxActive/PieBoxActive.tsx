import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import './pieBoxActive.css';
import { useState } from 'react';
import { renderActiveShape } from '../../../utils';
type PieBoxActiveData = {
	name: string, 
	value: number,
	label?: string
}
type PieBoxActiveProps = {
	data: PieBoxActiveData[]
}
const PieBoxActive = ({ data }: PieBoxActiveProps) => {
	const [activeIndex, setActiveIndex] = useState(0)

	const onPieEnter = (_: PieBoxActiveData,index: number) => setActiveIndex(index);

	return (
		<div className="piebox-active">
			<ResponsiveContainer width="99%" height="100%">
				<PieChart>
					<Pie
						activeIndex={activeIndex} // or data.map((_, index) => index) to make all cells active
						activeShape={renderActiveShape}
						data={data}
						cx="50%"
						cy="50%"
						innerRadius="35%"
						outerRadius="60%"
						fill="#8884d8"
						dataKey="value"
						onMouseEnter={onPieEnter}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
};

export default PieBoxActive;