import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { MonthlyChecking } from '../../types';
import { months, getYearlyChecking } from '../../data/budget.data';
import { BarBox, CheckingWidget, Dropdown, PieBoxActive } from '../../componenets';
import { generateColors } from '../../utils/colors.utils';
import './budget.css';

const yearlyChecking = getYearlyChecking();
const sum = (expenses: MonthlyChecking[]) => expenses.reduce((prev, curr) => prev + curr.value, 0);


const ExpenseSection = ({expenses, label} : { expenses: MonthlyChecking[], label: string}) => {
	const { t } = useTranslation();

	const parse = (expenses: MonthlyChecking[]) => expenses.map((month, index) => ({
		name: t(`translation:categories.${month.category}`),
		value: month.value,
		fill: colors[index]
	}))

	const colors = generateColors(expenses.length);
	return (
		<div className="budget-expenses">
			<div className="budget-expenses-info">
				<h2>{t(`translation:${label}`)}</h2>
				<p><span>{t("translation:charge")}</span> : ₪{sum(expenses)}</p>
			</div>
			<div className="budget-expenses-charts">
				<PieBoxActive data={expenses.map((month, index) => ({
					name: t(`translation:categories.${month.category}`),
					value: month.value,
					fill: colors[index],
					label: t(`translation:total`)
				}))}
				/>
				<BarBox data={parse(expenses)}/>
			</div>
		</div>
	)
}

const Budget = () => {
	const { t } = useTranslation();
	const [selectedMonth, setSelectedMonth] = useState(0);
	const [fixedExpenses, setFixedExpenses] = useState<MonthlyChecking[]>([])
	const [dynamicExpenses, setDynamicExpenses] = useState<MonthlyChecking[]>([])

	useEffect(() => {
		const fixed = [], dynamic = []
		for(const category of yearlyChecking[selectedMonth]){
			if(category.isFixed && category.date.getMonth() === selectedMonth) fixed.push(category);
			else dynamic.push(category)
		}
		setFixedExpenses([...fixed]);
		setDynamicExpenses([...dynamic]);
	}, [selectedMonth]);

	const handleChange = (month: string) => setSelectedMonth(Number(month));

	return (
		<section className='my-budget'>
			<div className='month-selector'>
				<Dropdown label={t(`translation:choose_month`)} options={months} onClick={handleChange}/>
				<CheckingWidget 
					income={15000} 
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