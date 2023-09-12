import { AccountActionType } from "./account_context.types"

export interface UIConstant {
	CHANGE_LANG: 'CHANGE_LANG',
	CHANGE_THEME: 'CHANGE_THEME'
}

export interface AccountConstants  {
	[key: string]: AccountActionType
}