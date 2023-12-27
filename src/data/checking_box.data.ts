import { TFunction } from "i18next";
import { CheckingHistoryData, MonthType } from "../types";
import { CheckingData } from "../types/charts.types";

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;


export const getCheckingHistory = (t: TFunction<"translation", undefined>) => {
	const checkingHistory: CheckingHistoryData[] = [];
	const months: MonthType[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	for (const month of months) {
		const income = getRandomNumber(4500, 13000);
		const expenses = getRandomNumber(3000, 4500);
		const saving = income - expenses;
		checkingHistory.push({ month: t(`translation:months_short.${month}`), income, expenses, saving });
  }
  return checkingHistory;
}

export const checkingData: CheckingData = {
	title: 'title',
	list: ['savings', 'expenses', 'net_income'],
	colors: ['#bbbbbb', '#82ca9d', '#8884d8']
}

