import { ReactNode, createContext, useContext, useReducer } from "react";
import { UIState, UIAction} from "../../types";
import { UIConstants, he } from "../../constants";

const { CHANGE_LANG, CHANGE_THEME, OPEN_NAVBAR, CLOSE_NAVBAR } = UIConstants;

const INITIAL_STATE : UIState = {
	lang: he,
	theme: "dark",
	isNavOpen: false,
}

const reducer = (state: UIState, action: UIAction) => {
	switch(action.type){
		case CHANGE_LANG: 
			return {...state, lang: action.lang };
		case CHANGE_THEME: 
			return {...state, theme: action.theme };
		case CLOSE_NAVBAR: 
			return {...state, isNavOpen: false }
		case OPEN_NAVBAR: 
			return {...state, isNavOpen: true }
		default: 
			return state;
	}
}

export const UIContext = createContext<UIState | null>(null);

type Props = { children: ReactNode };
export const UIContextProvider = ({ children } : Props) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	return (
		<UIContext.Provider value={{...state, dispatch}}>
			{children}
		</UIContext.Provider>
	)
}

export const useUIContext = (): UIState => {
	const context = useContext<UIState | null>(UIContext);
	if(!context){
		throw new Error("Can not use UIContext outside of it's provider!");
	}
	return context;
}
