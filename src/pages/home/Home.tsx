import './home.css';
import ChartBox from '../../componenets/chartBox/ChartBox';
import PieBox from '../../componenets/pieBox/PieBox';

const income = {
	title: "7000$",
	label: "-4.5"
}

const expense = {
	title: "4000$",
	label: "7"
}

const Home = () : JSX.Element => {
	return (
		<div className="home">
			<div className="box box-1">
				<PieBox />
			</div>
			<div className="box box-2">
				<ChartBox title="income" text={income}/>
			</div>
			<div className="box box-3">
				<ChartBox title="expense" text={expense}/>	
			</div>
			<div className="box box-4"></div>
			<div className="box box-5"></div>
		</div>
	);
}

export default Home;