import { CheckingWidget } from '../../componenets';
import './budget.css';


const widgetData = {
	income: 11867,
	fixedExpenses: 3903,
	dynamicExpenses: 3830,
}
const Budget = () => {
	return (
		<section className='my-budget'>
			<CheckingWidget {...widgetData}/>
		</section>
	)
};

export default Budget;