import './home.css';
import { generateColors } from '../../utils/colors';
import { pieChartData, income, expense } from '../../data/pie_chart.data';
import { CategoryBox, ChartBox, PieBox } from '../../componenets';

let colors: string[] = generateColors(pieChartData.length);

const Home = () : JSX.Element => {
	return (
		<main className="home">
			<div className="box box-1">
				<span className='pie-total'>{pieChartData.reduce((acc, curr) => acc + curr.amount, 0)}</span>
				<PieBox categories={pieChartData} colors={colors}/>
			</div>
			<div className="box box-2">
				<ChartBox title="income" label={income} flux='negative'/>
			</div>
			<div className="box box-3">
				<ChartBox title="expense" label={expense} flux='positive'/>	
			</div>
			<div className="box box-4">
			</div>
			<div className="box box-5">
				<CategoryBox categories={pieChartData} colors={colors}/>
			</div>
		</main>
	);
}

export default Home;