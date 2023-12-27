import { Dispatch, SetStateAction } from "react";

export type Theme = {
	theme: string,
	setTheme?: Dispatch<SetStateAction<string>>,
};