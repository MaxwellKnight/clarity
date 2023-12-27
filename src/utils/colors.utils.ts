export const relaxingColors = new Set([
	"#6A0572", // Purple
	"#B83B5E", // Rose
	"#E94560", // Salmon Pink
	"#FAA33B", // Apricot
	"#F4D35E", // Pastel Yellow
	"#A7C957", // Sage Green
	"#60A561", // Mint Green
	"#41A5D9", // Sky Blue
	"#F28D35", // Peach
	"#B5C3CC", // Light Gray
	"#2E4052", // Dark Slate Blue
	"#3498DB", // Blue
	"#009688", // Teal
	"#6BB9F0", // Light Blue
	"#8E44AD", // Wisteria Purple
	"#D24D57", // Rouge
	"#F5AB35", // Yellow Orange
	"#82CCDD", // Powder Blue
	"#A9DFBF", // Opal Green
	"#66CC99", // Sage
	"#F3A683", // Deep Peach
	"#F7DC6F", // Medium Yellow
	"#FF5733", // Coral
	"#5E8C6A", // Sea Green
	"#FFA07A", // Light Salmon
	"#F39C12", // Orange
	"#8E44AD", // Amethyst
	"#F7DC6F", // Maize
	"#D98880", // Antique Ruby
	"#85C1E9", // Baby Blue
	"#E74C3C", // Alizarin Crimson
	"#48C9B0", // Medium Aquamarine
	"#9A7D0A", // Chocolate
	"#C0392B", // Red
	"#3A539B", // Royal Blue
	"#F39C12", // Sunflower Yellow
	"#1E8449", // Shamrock Green
	"#F0B27A", // Sandy Brown
	"#1F618D", // Navy Blue
	"#C70039", // Byzantine
	"#4A235A", // Tyrian Purple
	"#7B241C", // Chestnut
]);

const getRandomColor = () => {
	const randomIndex = Math.floor(Math.random() * relaxingColors.size);
	const colorsArray = Array.from(relaxingColors);
	return colorsArray[randomIndex];
}

export const generateColors = (length: number): string[] => {
	const colors: string[] = [];
	while (colors.length < length) {
		 const color = getRandomColor();
		 if (!colors.includes(color)) {
			  colors.push(color);
		 }
	}
	return colors;
}
