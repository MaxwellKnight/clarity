import { Expense } from '../../types';
import { useTranslation } from 'react-i18next';
import { PieBoxActive, BarBox } from '../../componenets';
import { formatNumber, parseExpenses } from '../../utils';
import './_expensesSection.css';

type ExpenseSectionProps = {
	expenses: Expense[],
	average: Expense[],
	totalSum: number,
	label: number | string
}

const ExpenseSection = ({ expenses, average, label, totalSum } : ExpenseSectionProps) => {
	const { t } = useTranslation();

	return (
		<div className="budget-expenses">
			<div className="budget-expenses-info">
				<h2>{t(`translation:${label}`)}</h2>
				<p><span>{t("translation:charge")}</span> : ₪{formatNumber(totalSum)}</p>
			</div>
			<div className="budget-expenses-charts">
				<PieBoxActive data={parseExpenses(expenses, average, t("translation:total"))} />
				<BarBox data={parseExpenses(expenses, average)}/>
			</div>
		</div>
	)
}

export default ExpenseSection;