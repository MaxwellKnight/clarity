import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Bar, Area } from 'recharts';
import './checkingBox.css';
import { CheckingHistoryData } from '../../types';
import { checkingData } from '../../data/checking_box.data';
import { useContext, useState } from 'react';
import { UIContext } from '../../context';
import { CustomCheckingTooltip } from '../../utils/rechartsCustom';

interface Props {
	data: CheckingHistoryData[]
}

const CheckingBox = ({ data }: Props) => {
	const { lang } = useContext(UIContext);
	const [composedChartData, setComposedChartData] = useState([...data]);

	const handleOnResize = (width: number) => {
		if(width < 400){
			setComposedChartData(() => data.slice(8, 12));
			return;
		}
		else if(width < 500) {
			setComposedChartData(() => data.slice(6, 12));
			return;
		}
		else if(width > 900){
			setComposedChartData(() => data);
			return;
		}
	}

	return (
		<div className='checking-box'>
			<div className="checking-info">
				<h2>{checkingData[`title_${lang.lang}`]}</h2>
				<div className="info-label">
					{checkingData[`list_${lang.lang}`].map((label: string, index: number) => (
						<div key={index} className='info-item'>
							<span className='label-box' style={{backgroundColor: checkingData.colors[index]}}></span>
							<span>{label}</span>
						</div>
					))}
				</div>
			</div>
			<div className="checking-chart">
				<ResponsiveContainer width="99%" height="99%" onResize={(width: number) => handleOnResize(width)}>
					<ComposedChart
						data={composedChartData}
						margin={{ left: 30 }}
					>
						<XAxis dataKey="month" scale="auto" />
						<YAxis width={30} />
						<Tooltip content={<CustomCheckingTooltip lang={lang}/>}/>
						<Bar dataKey="income" fill="#8884d8" />
          			<Bar dataKey="expenses" fill="#82ca9d" />
						<Area type="monotone" dataKey="saving" stroke="#bbbbbb" strokeWidth={5} fill="#bbbbbb" dot={true}/>
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
};

export default CheckingBox;