import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UIContextProvider } from './context/UIContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
		<UIContextProvider>
			<App />
		</UIContextProvider>
  </React.StrictMode>,
)
