import { Dispatch } from "react";

interface Hebrew { lang: "he", dir: "rtl" };
interface English { lang: "en", dir: "ltr" };
interface Russian { lang: "ru", dir: "ltr" };
interface Arabic { lang: "ar", dir: "rtl" };
export type LangType = Hebrew | Arabic | English | Russian;

export type UIState = {
	lang: LangType,
	theme: string,
	isNavOpen: boolean,
	dispatch?: Dispatch<UIAction>,
};

type UIActionType = 'CHANGE_LANG' | 'CHANGE_THEME' | 'OPEN_NAVBAR' | 'CLOSE_NAVBAR';
export type UIAction = {
	type: UIActionType,
	lang: LangType,
	theme: string
};