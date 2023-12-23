import { months } from '../../data/budget.data';
import { useFetch, useLocalStorage } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {  MonthlyChecking, FetchResponse } from '../../types';
import { CheckingWidget, Dropdown } from '../../componenets';
import ExpenseSection from './ExpenseSection';
import CategorySection from './CategorySection';
import { AnimatePresence, motion } from 'framer-motion';
import './budget.css';

type MonthlyCheckingFetch = MonthlyChecking | null | undefined;
type Categories = string[];
type CategoriesFetch = Categories | null | undefined;

const AVG_EXPENSES = 12;

const Budget = () => {
	const { t } = useTranslation();
	const [selectedMonth, setSelectedMonth] = useLocalStorage("selectedMonth", 0);
	const [currentExpenses, setCurrentExpenses] = useState<MonthlyCheckingFetch>();
	
	const { data: averageChecking, loading: loadingAvg}: FetchResponse<MonthlyCheckingFetch> = useFetch(`http://localhost:3001/info/budget/avg`);
	const { data: categories , loading: loadingCategories }: FetchResponse<CategoriesFetch> = useFetch('http://localhost:3001/info/budget/categories');
	const { data: currentChecking, loading: loadingCurr}: FetchResponse<MonthlyCheckingFetch> = useFetch(
		`http://localhost:3001/info/budget/${selectedMonth}`,
		{},
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
		<AnimatePresence>
			<motion.div 
				className='my-budget'
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 1000}}
				transition={{duration: .5}}
			>
				<div className='month-selector'>
					<Dropdown className="custom-drop-down" label={t(`translation:choose_month`)} options={months} onClick={handleChange} defaultValue={selectedMonth}/>
					
					<CheckingWidget 
						income={currentExpenses?.income} 
						fixedExpenses={currentExpenses?.totalFixed} 
						dynamicExpenses={currentExpenses?.totalDynamic}
					/>
				</div>
				{currentExpenses && averageChecking ? <>
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
					/></> : null
				}
				{!loadingCategories && categories ? 
					<AnimatePresence key='wait'>
						<CategorySection categories={categories} /> 
					</AnimatePresence>
				: null}
			</motion.div>
		</AnimatePresence>
	)
};

export default Budget;