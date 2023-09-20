import { months } from '../../data/budget.data';
import { useFetch } from '../../hooks';
import { generateColors } from '../../utils/colors.utils';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Expense, MonthlyChecking } from '../../types';
import { BarBox, CheckingWidget, Dropdown, PieBoxActive } from '../../componenets';
import './budget.css';

type Response<T> = {
	data: T,
	loading: boolean | undefined,
	error: string | null | undefined
}
type AverageChecking = {
	income: number,
	totalFixed: number,
	totalDynamic: number,
	fixed_expenses: Expense[],
	dynamic_expenses: Expense[]
}

type ExpenseSectionProps = {
	expenses: Expense[],
	average: Expense[],
	label: string
}

const AVG_EXPENSES = 12;
const MAX_COLORS = 23;
const COLORS = generateColors(MAX_COLORS);

const sum = (expenses: Expense[]) => expenses.reduce((prev, curr) => prev + curr.value, 0);

const ExpenseSection = ({ expenses, average, label } : ExpenseSectionProps) => {
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
				<p><span>{t("translation:charge")}</span> : ₪{sum(expenses)}</p>
			</div>
			<div className="budget-expenses-charts">
				<PieBoxActive data={parse(expenses, t("translation:total"))} />
				<BarBox data={parse(expenses)}/>
			</div>
		</div>
	)
}

const Budget = () => {
	const { t } = useTranslation();
	const [selectedMonth, setSelectedMonth] = useState(0);
	const [currentExpenses, setCurrentExpenses] = useState<MonthlyChecking | AverageChecking>();

	const { data: currentChecking, loading}: Response<MonthlyChecking | null | undefined> = 
		useFetch(`http://localhost:3001/info/budget/${selectedMonth}`, [selectedMonth]);

	const { data: averageChecking}: Response<AverageChecking | null | undefined> = 
		useFetch(`http://localhost:3001/info/budget/avg`);

	useEffect(() => {
		if(averageChecking && selectedMonth === AVG_EXPENSES) {
			setCurrentExpenses({...averageChecking});
		}
		else if(currentChecking) setCurrentExpenses({...currentChecking})
		
	}, [selectedMonth, loading])
	
	const handleChange = (month: string) => setSelectedMonth(Number(month));
	return (
		<section className='my-budget'>
			<div className='month-selector'>
				<Dropdown label={t(`translation:choose_month`)} options={months} onClick={handleChange}/>
				
				<CheckingWidget 
					income={currentExpenses?.income} 
					fixedExpenses={currentExpenses?.totalFixed} 
					dynamicExpenses={currentExpenses?.totalDynamic}
				/>
			</div>
			{currentExpenses && averageChecking && 
				<>
				<ExpenseSection 
					expenses={currentExpenses.fixed_expenses}
					average={averageChecking.fixed_expenses}  
					label='fixed_expenses'
				/>
				<ExpenseSection 
					expenses={currentExpenses.dynamic_expenses}
					average={averageChecking.dynamic_expenses} 
					label='dynamic_expenses'
				/>
				</>
			}
		</section>
	)
};

export default Budget;