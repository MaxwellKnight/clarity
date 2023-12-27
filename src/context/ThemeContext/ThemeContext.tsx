import { 
	ReactNode, 
	createContext, 
	useContext, 
	useState 
} from "react";
import { Theme } from "../../types/theme_context.types";

export const ThemeContext = createContext<Theme | null>(null);

type Props = { children: ReactNode };
export const ThemeContextProvider = ({ children } : Props) => {
	const [theme, setTheme] = useState('dark');

	return (
		<ThemeContext.Provider value={{theme, setTheme}}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if(!context){
		throw new Error("Can not use UIContext outside of it's provider!");
	}
	return context;
}
