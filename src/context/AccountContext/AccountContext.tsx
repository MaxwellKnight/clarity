import { ReactNode, createContext, useContext, useReducer } from "react";
import { AccountAction, AccountState } from "../../types";

const AccountContext = createContext<AccountState | null>(null);

const accountReducer = (state: AccountState, action: AccountAction) => ({
		...state,
		[action.type]: action.value
})

const initial: AccountState = {
	balance: 11250,
	credit: 2102,
	cash: 1095,
	fixed: 4000,
	fixedBasic: 3000,
	fixedFromBank: 400,
	fixedLuxury: 200,
	income: 10000,
	savingGoal: 2000,
	savingSub: 1000,
	housing: 3000,
	rent: 2400,
	cashReserve: 300,
	possDev: 100,
	reserve: 100,
}

interface AccountContextProviderProps {
	children: ReactNode
}
export const AccountContextProvier = ({ children }: AccountContextProviderProps) => {
	const [account, dispatch] = useReducer(accountReducer, initial);

	return ( 
		<AccountContext.Provider value={{...account, dispatch}}>
			{children}
		</AccountContext.Provider>
	)
}

export const useAccount = () => {
	const context = useContext<AccountState | null>(AccountContext);
	if(!context){
		throw new Error("You can only use account in its provider!");
	}
	return context;
}