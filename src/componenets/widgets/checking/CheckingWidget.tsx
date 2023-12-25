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

	return (
		<div className="checking-widget">
			<div className="income">
				<p className='income-title'>{t(`translation:income`)}</p>
				<p className='income-amount'>₪{formatNumber(income)}</p>
				<span className='income-percentage'>{formatNumber(income * 100 / divisionIncome)}%</span>
			</div>
			<div className="fixed-expenses">
				<p className='fixed-expenses-title'>{t(`translation:fixed_expenses`)}</p>
				<p className='fixed-expenses-amount'>₪{formatNumber(fixedExpenses)}</p>
				<span className='fixed-expenses-percentage'>{formatNumber(Number((fixedExpenses * 100 / divisionIncome).toFixed(0)))}%</span>
			</div>
			<div className="dynamic-expenses">
				<p className='dynamic-expenses-title'>{t(`translation:dynamic_expenses`)}</p>
				<p className='dynamic-expenses-amount'>₪{formatNumber(dynamicExpenses)}</p>
				<span className='dynamic-expenses-percentage'>{formatNumber(Number((dynamicExpenses * 100 / divisionIncome).toFixed(0)))}%</span>
			</div>
			<div className="savings">
				<p className='savings-title'>{t(`translation:savings`)}</p>
				<p className='savings-amount'>₪{formatNumber(savings)}</p>
				<span className='savings-percentage'>{formatNumber(Number((savings * 100 / income).toFixed(0)))}%</span>
			</div>
		</div>
	)
}

export default CheckingWidget;