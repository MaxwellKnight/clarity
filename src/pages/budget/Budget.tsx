import { CheckingWidget, Dropdown } from '../../componenets';
import './budget.css';

const widgetData = {
	income: 11867,
	fixedExpenses: 3903,
	dynamicExpenses: 3830,
}
const Budget = () => {
	return (
		<section className='my-budget'>
			<Dropdown 
				className=''
				label='חודש'
				options={[{value: 0, label: 0}, {value: 1, label: 1}]}
				renderOption={(option) => option.label}
			/>
			<CheckingWidget {...widgetData}/>
		</section>
	)
};

export default Budget;