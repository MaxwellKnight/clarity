import './home.css';
import { generateColors } from '../../utils/colors';
import { pieChartData, income, expense } from '../../data/pie_chart.data';
import { CategoryBox, ChartBox, CheckingBox, PieBox } from '../../componenets';
import { getCheckingHistory } from '../../data/checking_box.data';
import { CheckingHistoryData } from '../../types';

const colors: string[] = generateColors(pieChartData.length);
const checkingHistory: CheckingHistoryData[] = getCheckingHistory();

const Home = () : JSX.Element => {

	return (
		<main className="home">
			<div className="box box-1">
				<ChartBox title="income" label={income} flux='negative'/>
			</div>
			<div className="box box-2">
				<ChartBox title="expense" label={expense} flux='positive'/>	
			</div>
			<div className="box box-3">
				<span className='pie-total'>{pieChartData.reduce((acc, curr) => acc + curr.amount, 0)}</span>
				<PieBox categories={pieChartData} colors={colors}/>
			</div>
			<div className="box box-4">
				<CategoryBox categories={pieChartData} colors={colors}/>
			</div>
			<div className="box box-5">
				<CheckingBox data={checkingHistory}/>
			</div>
		</main>
	);
}

export default Home;