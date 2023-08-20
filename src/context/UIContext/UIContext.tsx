import { createContext, useReducer } from "react";
import { UIState, UIAction} from "../../types";
import * as lang from "../../constants/langs";

const reducer = (state: UIState, action: UIAction) => {
	switch(action.type){
		case 'lang':
			return {
				...state, 
				lang: action.value_lang
			};
		case 'theme':
			return {
				...state,
				theme: action.value_theme
			};
		default:
			return state
	}
}

export const UIContext = createContext<UIState>({ lang: lang.he, theme: "emperical" });

export const UIContextProvider = ({ children } : { children: JSX.Element }) => {
	const [state, dispatch] = useReducer(reducer, { lang: lang.en, theme: "" })

	return (
		<UIContext.Provider value={{...state, dispatch}}>
			{children}
		</UIContext.Provider>
	)
}
