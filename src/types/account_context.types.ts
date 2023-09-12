import { Dispatch } from "react"

export type AccountActionType = 
	"credit" | "cash" | "fixed" | "savingGoal"  | "income" |
	"fixedBasic" | "fixedLuxury" | "fixedFromBank" | "housing" | "balance" |
	"savingSub" | "rent" | "cashReserve" | "reserve" | "possDev";

export interface Account {
	balance: number,
	credit: number,
	cash: number,
	fixed: number,
	savingGoal: number,
	income: number,
	fixedBasic: number,
	fixedLuxury: number,
	fixedFromBank: number,
	savingSub: number,
	possDev: number,
	housing: number,
	rent: number,
	cashReserve: number,
	reserve: number
}

export interface AccountAction {
	type: AccountActionType,
	value: number,
}

export interface AccountState extends Account {
	dispatch?: Dispatch<AccountAction>
}
