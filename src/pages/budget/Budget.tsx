import { months } from '../../data/budget.data';
import { useFetch } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {  MonthlyChecking, FetchResponse } from '../../types';
import { CheckingWidget, Dropdown, CategoryWidget } from '../../componenets';
import ExpenseSection from './ExpenseSection';
import './budget.css';

type MonthlyCheckingFetch = MonthlyChecking | null | undefined;

const AVG_EXPENSES = 12;

const Budget = () => {
	const { t } = useTranslation();
	const [selectedMonth, setSelectedMonth] = useState(0);
	const [currentExpenses, setCurrentExpenses] = useState<MonthlyCheckingFetch>();
	
	const { data: averageChecking, loading: loadingAvg}: FetchResponse<MonthlyCheckingFetch> = useFetch(`http://localhost:3001/info/budget/avg`);
	const { data: currentChecking, loading: loadingCurr}: FetchResponse<MonthlyCheckingFetch> = useFetch(
		`http://localhost:3001/info/budget/${selectedMonth}`, 
		[selectedMonth]
	);

	const handleChange = (month: string) => setSelectedMonth(() => Number(month));
	
	useEffect(() => {
		if(!loadingAvg && averageChecking && selectedMonth === AVG_EXPENSES){
			setCurrentExpenses({...averageChecking});
			return;
		} 
		else if(!loadingCurr && currentChecking) setCurrentExpenses({...currentChecking})
	}, [selectedMonth, loadingCurr, loadingAvg])


	
	return (
		<section className='my-budget'>
			<div className='month-selector'>
				<Dropdown className="custom-drop-down" label={t(`translation:choose_month`)} options={months} onClick={handleChange}/>
				
				<CheckingWidget 
					income={currentExpenses?.income} 
					fixedExpenses={currentExpenses?.totalFixed} 
					dynamicExpenses={currentExpenses?.totalDynamic}
				/>
			</div>
			{currentExpenses && averageChecking && 
				<>
					<ExpenseSection 
						expenses={currentExpenses.dynamic_expenses}
						totalSum={currentExpenses.totalDynamic}
						average={averageChecking.dynamic_expenses} 
						label='dynamic_expenses'
					/>
					<ExpenseSection 
						expenses={currentExpenses.fixed_expenses}
						totalSum={currentExpenses.totalFixed}
						average={averageChecking.fixed_expenses}  
						label='fixed_expenses'
					/>
				</>
			}
			<CategoryWidget />
		</section>
	)
};

export default Budget;