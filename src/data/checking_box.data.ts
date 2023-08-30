import { CheckingHistoryData, MonthType } from "../types";
import { CheckingData } from "../types/charts.types";

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;


const getCheckingHistory = () => {
	const checkingHistory: CheckingHistoryData[] = [];
	const months: MonthType[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	for (const month of months) {
		const income = getRandomNumber(4500, 13000);
		const expenses = getRandomNumber(3000, 4500);
		const saving = income - expenses;
		checkingHistory.push({ month, income, expenses, saving });
  }
  return checkingHistory;
}

const checkingData: CheckingData = {
	title_he: 'היסטורית הכנסות מול הוצאות',
	title_en: 'History of income vs expenses',
	title_ru: 'История доходов и расходов',
	title_ar: 'تاريخ الدخل مقابل النفقات',
	list_he: ['חסכון', 'הוצאות', 'הכנסה נטו'],
	list_en: ['saving', 'expenses', 'net income'],
	list_ru: ['экономия', 'затраты', 'чистая прибыль'],
	list_ar: ['إنقاذ', 'نفقات', '', 'كنسا نتو'],
	colors: ['#bbbbbb', '#82ca9d', '#8884d8']
}

export {getCheckingHistory, checkingData};

