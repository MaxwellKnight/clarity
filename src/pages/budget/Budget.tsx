import { useTranslation } from 'react-i18next';
import { CheckingWidget, Dropdown } from '../../componenets';
import { months } from '../../data/budget.data';
import './budget.css';

const widgetData = {
	income: 11867,
	fixedExpenses: 3903,
	dynamicExpenses: 3830,
}
const Budget = () => {
	const { t } = useTranslation();
	return (
		<section className='my-budget'>
			<div className='month-selector'>
				<Dropdown 
					className=''
					label={t(`translation:choose_month`)}
					options={months}
				/>
				<CheckingWidget {...widgetData}/>
			</div>
		</section>
	)
};

export default Budget;