import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Bar, Area } from 'recharts';
import './checkingBox.css';
import { CheckingHistoryData } from '../../../types';
import { checkingData } from '../../../data/checking_box.data';
import { useState } from 'react';
import { CustomCheckingTooltip } from '../../../utils';
import { useTranslation } from 'react-i18next';

interface CheckingBoxProps {
	data: CheckingHistoryData[]
}

const CheckingBox = ({ data }: CheckingBoxProps) => {
	const [composedChartData, setComposedChartData] = useState([...data]);
	const { t } = useTranslation();

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
				<h2>{t(`translation:checking.title`)}</h2>
				<div className="info-label">
					{checkingData.list.map((label: string, index: number) => (
						<div key={index} className='info-item'>
							<span className='label-box' style={{backgroundColor: checkingData.colors[index]}}></span>
							<span>{t(`translation:${label}`)}</span>
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
						<Tooltip content={<CustomCheckingTooltip />}/>
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