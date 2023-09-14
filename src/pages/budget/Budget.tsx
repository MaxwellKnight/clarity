import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { months, monthlyBudget } from '../../data/budget.data';
import { CheckingWidget, Dropdown } from '../../componenets';
import './budget.css';

const Budget = () => {
	const { t } = useTranslation();
	const [selectedMonth, setSelectedMonth] = useState(1);
	const handleChange = (month: string) => setSelectedMonth(Number(month));

	return (
		<section className='my-budget'>
			<div className='month-selector'>
				<Dropdown label={t(`translation:choose_month`)} options={months} onClick={handleChange}/>
				<CheckingWidget {...monthlyBudget[selectedMonth - 1]}/>
			</div>
		</section>
	)
};

export default Budget;