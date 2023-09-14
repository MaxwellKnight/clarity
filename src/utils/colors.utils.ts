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
]);

export const getRandomColor = () => {
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
