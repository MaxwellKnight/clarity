import { useTranslation } from 'react-i18next';
import './checkingWidget.css';
import { formatNumber } from '../../../utils';


interface CheckingWidgetProps {
	income?: number,
	fixedExpenses?: number,
	dynamicExpenses?: number,
}
const CheckingWidget = ({income = 0, fixedExpenses = 0, dynamicExpenses = 0}: CheckingWidgetProps) => {
	const { t } = useTranslation();
	const savings = income - (fixedExpenses + dynamicExpenses);
	const divisionIncome = income === 0 ? 1 : income;

	/**
	 * function calculates the percentage of part in relation to the whole
	 * 
	 * @param {number} whole - the total amount (the 100%)
	 * @param {number} part - part of the total amount (the X%)
	 * @returns {string}
	 */
	const calculatePercentage = (whole: number, part: number) => formatNumber(Number(whole * 100 / part).toFixed(0));
	
	return (
		<div className="checking-widget">
			<div className="income">
				<p className='income-title'>{t(`translation:income`)}</p>
				<p className='income-amount'>₪{formatNumber(income)}</p>
				<span className='income-percentage'>{calculatePercentage(income, divisionIncome)}%</span>
			</div>
			<div className="fixed-expenses">
				<p className='fixed-expenses-title'>{t(`translation:fixed_expenses`)}</p>
				<p className='fixed-expenses-amount'>₪{formatNumber(fixedExpenses)}</p>
				<span className='fixed-expenses-percentage'>{calculatePercentage(fixedExpenses, divisionIncome)}%</span>
			</div>
			<div className="dynamic-expenses">
				<p className='dynamic-expenses-title'>{t(`translation:dynamic_expenses`)}</p>
				<p className='dynamic-expenses-amount'>₪{formatNumber(dynamicExpenses)}</p>
				<span className='dynamic-expenses-percentage'>{calculatePercentage(dynamicExpenses, divisionIncome)}%</span>
			</div>
			<div className="savings">
				<p className='savings-title'>{t(`translation:savings`)}</p>
				<p className='savings-amount'>₪{formatNumber(savings)}</p>
				<span className='savings-percentage'>{calculatePercentage(savings, income)}%</span>
			</div>
		</div>
	)
}

export default CheckingWidget;