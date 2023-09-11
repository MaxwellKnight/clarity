import { AccountActionType } from "./account_context.types"

export interface UIConstant {
	CHANGE_LANG: 'CHANGE_LANG',
	CHANGE_THEME: 'CHANGE_THEME',
	OPEN_NAVBAR: 'OPEN_NAVBAR',
	CLOSE_NAVBAR: 'CLOSE_NAVBAR'
}

export interface AccountConstants  {
	[key: string]: AccountActionType
}