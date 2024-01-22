import { Account } from "../types";

export const expenses = (account: Account) => 
	account.credit + account.cash + account.fixed

export const netIncome = (account: Account) => account.income - basicExpenses(account);

export const basicExpenses = (account: Account) =>
	account.housing + account.fixedBasic + account.fixedFromBank;

export const luxuryExpenses = (account: Account) =>
	account.income - basicExpenses(account) - account.savingGoal;

export const basicNonCredit = (rent: number, fixedFromBank: number) => 
	rent + fixedFromBank;

export const maxCredit = (basicExpenses: number, luxuryExpenses: number, basicNonCredit: number, cash: number) =>
	basicExpenses + luxuryExpenses - basicNonCredit - cash;

export const netChange = (netIncome: number, savingSub: number) => 
	netIncome - savingSub;

export const quickReserve = (cashReserve: number, reserve: number) => 
	cashReserve - reserve;

export const antChange = (income: number, basicNonCredit: number, maxCredit: number, savingSub: number, possDev: number, quickReserve:  number) => 
	income - basicNonCredit - maxCredit - savingSub - possDev - quickReserve;

export const availableBalance = (balance: number, antChange: number, quickReserve: number) =>
	balance + antChange - quickReserve;
