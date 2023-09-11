import { Dispatch } from "react"

export type AccountActionType = 
	"credit" | "cash" | "fixed" | "savingGoal" | "expenses" | "income" | "netIncome" |
	"fixedBasic" | "fixedLuxury" | "fixedBank" | "basicExpenses" | "luxuryExpenses" | 
	"basicNonCredit" | "maxCredit" | "savingSub" | "netChange" |
	"quickReserve" | "possDev" | "antChange" | "availableBalance";

export interface Account {
	credit: number,
	cash: number,
	fixed: number,
	savingGoal: number,
	expenses: number,
	income: number,
	netIncome: number,
	fixedBasic: number,
	fixedLuxury: number,
	fixedFromBank: number,
	basicExpenses: number,
	luxuryExpenses: number,
	basicNonCredit: number,
	maxCredit: number,
	savingSub: number,
	netChange: number,
	quickReserve: number,
	possDev: number,
	antChange: number,
	availableBalance: number
}

export interface AccountState {
	account: Account,
	dispatch?: Dispatch<AccountState>
}

export interface AccountAction {
	type: AccountActionType,
	value: number,
}