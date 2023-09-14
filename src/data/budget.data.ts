export const months = [
	{
		value: 1, 
		label: 'translation:months_full.JAN'
	},
	{
		value: 2, 
		label: 'translation:months_full.FEB'
	},
	{
		value: 3, 
		label: 'translation:months_full.MAR'
	},
	{
		value: 4, 
		label: 'translation:months_full.APR'
	},
	{
		value: 5, 
		label: 'translation:months_full.MAY'
	},
	{
		value: 6, 
		label: 'translation:months_full.JUN'
	},
	{
		value: 7, 
		label: 'translation:months_full.JUL'
	},
	{
		value: 8, 
		label: 'translation:months_full.AUG'
	},
	{
		value: 9, 
		label: 'translation:months_full.SEP'
	},
	{
		value: 10, 
		label: 'translation:months_full.OCT'
	},
	{
		value: 11, 
		label: 'translation:months_full.NOV'
	},
	{
		value: 12, 
		label: 'translation:months_full.DEC'
	}
]

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const monthlyBudget = [
    {
        date: new Date(2023, 0, 1), // January
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 1, 1), // February
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 2, 1), // March
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 3, 1), // April
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 4, 1), // May
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 5, 1), // June
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 6, 1), // July
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 7, 1), // August
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 8, 1), // September
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 9, 1), // October
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 10, 1), // November
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
    {
        date: new Date(2023, 11, 1), // December
        income: randomBetween(8000, 15000),
        fixedExpenses: randomBetween(2000, 5000),
        dynamicExpenses: randomBetween(2000, 5000),
    },
];
