export const expenses = (credit: number, cash: number, fixed: number) => 
	credit + cash + fixed

export const netIncome = (income: number, expenses: number) => income - expenses;

export const basicExpenses = (housing: number, fixedBasic: number, fixedFromBank: number) =>
	housing + fixedBasic + fixedFromBank;

export const luxuryExpenses = (income: number, basicExpenses: number, savingGoal: number) =>
	income - basicExpenses - savingGoal;

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
