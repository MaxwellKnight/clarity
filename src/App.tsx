import {
	createBrowserRouter,
	RouterProvider,
 } from "react-router-dom";
import {	
	Budget,
	Expenses,
	Home,
	Layout,
	Login,
	Management,
	Register,
	Savings
} from "./pages";
import { useEffect, useState } from "react";
import { NotificationData } from "./types";
import './styles/global.css';
import { useTranslation } from "react-i18next";

const notificationsData: NotificationData[] = [
	{
		title: "תוכנית חדשה", 
		content: "קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי ושבעגט ליבם סולגק."
	}, 
	{
		title: "תוכנית חדשה", 
		content: "קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי ושבעגט ליבם סולגק."
	}, 
	{
		title: "תוכנית חדשה", 
		content: "קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי ושבעגט ליבם סולגק."
	}, 
]

const App = () : JSX.Element => {
	const [isMobileNavOpen, toggleIsNavOpen] = useState(false);
	const handleToggle = () => toggleIsNavOpen(prev => !prev);
	const { i18n } = useTranslation();
	useEffect(() => {
		const lang = navigator.language;
		i18n.changeLanguage(lang);
	}, [])

	const router = createBrowserRouter([{
		path: "/",
		element: 
			<Layout 
				closeMobileNav={handleToggle} 
				isMobileNavOpen={isMobileNavOpen} 
				notifications={notificationsData}
				dir={i18n.dir(navigator.language)}
			/>,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/expenses", element: <Expenses /> },
			{ path: "/savings", element: <Savings /> },
			{ path: "/budget", element: <Budget /> },
			{ path: "/management", element: <Management /> }
		]},

		{ path: "/login", element: <Login /> },
		{ path: "/register", element: <Register /> }
	]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
