import { Expense } from '../../types';
import { generateColors } from '../../utils';
import { useTranslation } from 'react-i18next';
import { PieBoxActive, BarBox } from '../../componenets';
import './_expensesSection.css';

const MAX_COLORS = 23;
const COLORS = generateColors(MAX_COLORS);

type ExpenseSectionProps = {
	expenses: Expense[],
	average: Expense[],
	totalSum: number,
	label: string
}

const ExpenseSection = ({ expenses, average, label, totalSum } : ExpenseSectionProps) => {
	const { t } = useTranslation();

	const parse = (expenses: Expense[], label?: string) => { 
		return expenses.map((expense, index) => {
			const found = average.find((exp) => exp.category === expense.category)
			return {
				name: t(`translation:categories.${expense.category}`),
				value: Number(expense.value.toFixed(1)),
				fill: COLORS[index],
				label: label,
				avg: found ? found.value : 0,
			}
		})
	}

	return (
		<div className="budget-expenses">
			<div className="budget-expenses-info">
				<h2>{t(`translation:${label}`)}</h2>
				<p><span>{t("translation:charge")}</span> : ₪{totalSum}</p>
			</div>
			<div className="budget-expenses-charts">
				<PieBoxActive data={parse(expenses, t("translation:total"))} />
				<BarBox data={parse(expenses)}/>
			</div>
		</div>
	)
}

export default ExpenseSection;