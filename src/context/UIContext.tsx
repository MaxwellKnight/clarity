import { createContext, useReducer } from "react";
import { UIState, UIAction} from "./ui_context.types";
import { he } from "../constants/langs";

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

const UIContext = createContext<UIState>({ lang: he, theme: "emperical" });

const UIContextProvider = ({children} : {children: JSX.Element}) => {
	const [state, dispatch] = useReducer(reducer, { lang: he, theme: "" })

	return (
		<UIContext.Provider value={{...state, dispatch}}>
			{children}
		</UIContext.Provider>
	)
}

export { UIContext, UIContextProvider };
