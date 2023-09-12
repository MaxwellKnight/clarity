import { Dispatch } from "react";

interface Hebrew { lang: "he", dir: "rtl" };
interface English { lang: "en", dir: "ltr" };
interface Russian { lang: "ru", dir: "ltr" };
interface Arabic { lang: "ar", dir: "rtl" };
export type LangType = Hebrew | Arabic | English | Russian;

export type UIState = {
	lang: LangType,
	theme: string,
	dispatch?: Dispatch<UIAction>,
};

type UIActionType = 'CHANGE_LANG' | 'CHANGE_THEME';
export type UIAction = {
	type: UIActionType,
	lang: LangType,
	theme: string
};