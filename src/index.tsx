import ReactDOM from 'react-dom/client';
import { ThemeContextProvider } from './context/index.ts';
import App from './App.tsx';
import './i18n.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
		<ThemeContextProvider>
			<App />
		</ThemeContextProvider>,
)
