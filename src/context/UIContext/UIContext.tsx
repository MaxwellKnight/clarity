import { ReactNode, createContext, useReducer } from "react";
import { UIState, UIAction} from "../../types";
import * as lang from "../../constants/langs";
import { UIConstants } from "../../constants/ui_constants";

const INITIAL_STATE : UIState = {
	lang: lang.he,
	theme: "dark"
}

const reducer = (state: UIState, action: UIAction) => {
	switch(action.type){
		case UIConstants.CHANGE_LANG:
			return {
				...state, 
				lang: action.value_lang
			};
		case UIConstants.CHANGE_THEME:
			return {
				...state,
				theme: action.value_theme
			};
		default:
			return state;
	}
}

export const UIContext = createContext<UIState>(INITIAL_STATE);

type Props = { children: ReactNode };

export const UIContextProvider = ({ children } : Props) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	return (
		<UIContext.Provider value={{...state, dispatch}}>
			{children}
		</UIContext.Provider>
	)
}
