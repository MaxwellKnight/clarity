export interface PieChartLabel { totalAmount: number, percentage: number};
export interface PieChartEntry { name: string, value: number };
export interface PieChartData  { 
	label: string, 
	amount: number
};

export interface CheckingData {
	title: string,
	list: string[],
	colors: string[]
}