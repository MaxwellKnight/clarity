import { PieChartLabel,  PieChartData, PieChartEntry } from './charts.types';
import { AccountActionType, Account, AccountAction, AccountState } from './account_context.types';
import { NotificationData } from './notifications.types';
import { SVGOptions } from './utils.types';
import { Theme }from './theme_context.types';

type MonthType = "JAN" | "FEB" | "MAR" | "APR" | "MAY" | "JUN" |
				 "JUL" | "AUG" | "SEP" | "OCT" | "NOV" | "DEC";

interface CheckingHistoryData {
	month: MonthType,
	income: number,
	expenses: number,
	saving: number
}

type MonthlyChecking = {
	isFixed: boolean,
	date: Date,
	category: string,
	value: number
}

export type {
	Theme,
	PieChartLabel,
	PieChartData,
	PieChartEntry,
	MonthType,
	CheckingHistoryData,
	AccountActionType,
	Account,
	AccountAction,
	AccountState,
	NotificationData,
	SVGOptions,
	MonthlyChecking
}