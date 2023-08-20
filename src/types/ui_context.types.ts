import { Dispatch } from "react";

export type Hebrew = { lang: "he", dir: "rtl" };
export type English = { lang: "en", dir: "ltr" };
export type Russian = { lang: "ru", dir: "ltr" };
export type Arabic = { lang: "ar", dir: "rtl" };
export type LangType = Hebrew | Arabic | English | Russian;

export type UIState = {
	lang: LangType,
	theme: string,
	dispatch?: Dispatch<UIAction>,
};

export type UIAction = {
	type: string,
	value_lang: LangType,
	value_theme: string
};