const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]

const getCharacter = (index: number) => {
	return hexCharacters[index]
}

export const generateColors = (length: number): string[] => {
	let colors = new Set<string>();

	while(colors.size < length){
		let hexColorRep: string = "#";
		for (let index: number = 0; index < 6; index++){
			const randomPosition = Math.floor (Math.random() * hexCharacters.length);
			hexColorRep += getCharacter(randomPosition);
		}
		colors.add(hexColorRep);
	}
	return [...colors];
}