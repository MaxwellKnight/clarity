import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Expense } from '../../types';
import { months, getYearlyChecking } from '../../data/budget.data';
import { BarBox, CheckingWidget, Dropdown, PieBoxActive } from '../../componenets';
import { generateColors } from '../../utils/colors.utils';
import './budget.css';

const yearlyChecking = getYearlyChecking();
const sum = (expenses: Expense[]) => expenses.reduce((prev, curr) => prev + curr.value, 0);

type ExpenseSectionProps = {
	expenses: Expense[],
	label: string
}
const ExpenseSection = ({ expenses, label } : ExpenseSectionProps) => {
	const { t } = useTranslation();

	const colors = generateColors(expenses.length);
	const parse = (expenses: Expense[], label?: string) => expenses.map((month, index) => ({
		name: t(`translation:categories.${month.category}`),
		value: month.value,
		fill: colors[index],
		label: label
	}))

	return (
		<div className="budget-expenses">
			<div className="budget-expenses-info">
				<h2>{t(`translation:${label}`)}</h2>
				<p><span>{t("translation:charge")}</span> : ₪{sum(expenses)}</p>
			</div>
			<div className="budget-expenses-charts">
				<PieBoxActive data={parse(expenses, t("translation:total"))} />
				<BarBox data={parse(expenses)} />
			</div>
		</div>
	)
}

const Budget = () => {
	const { t } = useTranslation();
	const [income, setIncome] = useState(0);
	const [selectedMonth, setSelectedMonth] = useState(0);
	const [fixedExpenses, setFixedExpenses] = useState<Expense[]>([])
	const [dynamicExpenses, setDynamicExpenses] = useState<Expense[]>([])

	useEffect(() => {
		if(selectedMonth === 12) return;
		const fixed = [], dynamic = []
		for(const expense of yearlyChecking[selectedMonth].expenses){
			if(expense.isFixed && expense.date.getMonth() === selectedMonth) fixed.push(expense);
			else dynamic.push(expense)
		}
		setFixedExpenses([...fixed.sort((a, b) => b.value - a.value)]);
		setDynamicExpenses([...dynamic.sort((a, b) => b.value - a.value)]);
		setIncome(yearlyChecking[selectedMonth].income);
	}, [selectedMonth]);

	const handleChange = (month: string) => setSelectedMonth(Number(month));
	console.log(fixedExpenses);
	return (
		<section className='my-budget'>
			<div className='month-selector'>
				<Dropdown label={t(`translation:choose_month`)} options={months} onClick={handleChange}/>
				<CheckingWidget 
					income={income} 
					fixedExpenses={sum(fixedExpenses)} 
					dynamicExpenses={sum(dynamicExpenses)}
				/>
			</div>
			<ExpenseSection expenses={fixedExpenses} label='fixed_expenses'/>
			<ExpenseSection expenses={dynamicExpenses} label='dynamic_expenses'/>
		</section>
	)
};

export default Budget;