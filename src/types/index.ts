import { PieChartLabel,  PieChartData, PieChartEntry } from './charts.types';
import { AccountActionType, Account, AccountAction, AccountState } from './account_context.types';
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

type Expense = {
	isFixed: boolean,
	date: Date,
	category: string,
	value: number
}

type MonthlyChecking = {
	income: number,
	totalFixed: number,
	totalDynamic: number,
	fixed_expenses: Expense[],
	dynamic_expenses: Expense[]
}

/* useFetch response type */
type FetchResponse<T> = {
	data: T,
	loading: boolean | undefined,
	error: string | null | undefined
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
	SVGOptions,
	Expense,
	MonthlyChecking,
	FetchResponse
}