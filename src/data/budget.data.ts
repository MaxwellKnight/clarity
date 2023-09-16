import { MonthlyChecking } from "../types";

export const months = [
	{
		value: 12, 
		label: 'translation:months_full.ALL'
	},
	{
		value: 0, 
		label: 'translation:months_full.JAN'
	},
	{
		value: 1, 
		label: 'translation:months_full.FEB'
	},
	{
		value: 2, 
		label: 'translation:months_full.MAR'
	},
	{
		value: 3, 
		label: 'translation:months_full.APR'
	},
	{
		value: 4, 
		label: 'translation:months_full.MAY'
	},
	{
		value: 5, 
		label: 'translation:months_full.JUN'
	},
	{
		value: 6, 
		label: 'translation:months_full.JUL'
	},
	{
		value: 7, 
		label: 'translation:months_full.AUG'
	},
	{
		value: 8, 
		label: 'translation:months_full.SEP'
	},
	{
		value: 9, 
		label: 'translation:months_full.OCT'
	},
	{
		value: 10, 
		label: 'translation:months_full.NOV'
	},
	{
		value: 11, 
		label: 'translation:months_full.DEC'
	},
]

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const fixedExpenses = ['rent_mortgage', 'home_tax', 'gym', 'loans', 'cellular_cables', 'car_insurance', 'house_insurance', 'health_insurance', 'car_holding'];
const dynamicExpenses = ['grocery', 'cash', 'restaurant', 'hobby', 'vacation', 'gifts', 'travel', 'electricity_bill', 'water_bill', 'gas_bill', 'house_holding', 'health_medication', 'tax_payments'];
const getMonthlyChecking = (month: number): MonthlyChecking => {
	const expenses = []
	for(const category of fixedExpenses){
		expenses.push({
			isFixed: true,
			date: new Date(2023, month, 28),
			category,
			value: randomBetween(50, 1000),
		})
	}
	for(const category of dynamicExpenses){
		expenses.push({
			isFixed: false,
			date: new Date(2023, month, 28),
			category,
			value: randomBetween(50, 1000)
		})
	}
	return {
		income: randomBetween(13000, 15000), 
		expenses
	};
}

export const getYearlyChecking = () => {
	let expenses: MonthlyChecking[] = []
	for(let i = 0; i < 12; i++){
		expenses.push(getMonthlyChecking(i));
	}
	return expenses;
}