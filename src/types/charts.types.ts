export interface PieChartLabel { totalAmount: number, percentage: number};
export interface PieChartEntry { name: string, value: number };
export interface PieChartData  { 
	category_he: string, 
	category_en: string, 
	category_ar: string, 
	category_ru: string, 
	amount: number
};

export interface CheckingData {
	title_he: string,
	title_ar: string,
	title_ru: string,
	title_en: string,
	list_he: string[]
	list_en: string[]
	list_ru: string[]
	list_ar: string[]
	colors: string[]
}