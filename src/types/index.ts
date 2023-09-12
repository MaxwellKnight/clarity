import { PieChartLabel,  PieChartData, PieChartEntry } from './charts.types';
import { UIConstant } from './constants.types';
import { AccountActionType, Account, AccountAction, AccountState } from './account_context.types';
import { NotificationData } from './notifications.types';
import {
	LangType,
	UIAction,
	UIState
}from './ui_context.types';

type MonthType = "JAN" | "FEB" | "MAR" | "APR" | "MAY" | "JUN" |
				 "JUL" | "AUG" | "SEP" | "OCT" | "NOV" | "DEC";

interface CheckingHistoryData {
	month: MonthType,
	income: number,
	expenses: number,
	saving: number
}

export type {
	LangType,
	UIAction,
	UIState,
	PieChartLabel,
	PieChartData,
	PieChartEntry,
	UIConstant,
	MonthType,
	CheckingHistoryData,
	AccountActionType,
	Account,
	AccountAction,
	AccountState,
	NotificationData
}