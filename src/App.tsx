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
	Register,
	Savings
} from "./pages";
import { useState } from "react";
import { NotificationData } from "./types";
import './styles/global.css';

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

	const router = createBrowserRouter([{
		path: "/",
		element: 
			<Layout 
				closeMobileNav={handleToggle} 
				isMobileNavOpen={isMobileNavOpen} 
				notifications={notificationsData}
			/>,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/expenses", element: <Expenses /> },
			{ path: "/savings", element: <Savings /> },
			{ path: "/budget", element: <Budget /> }
		]},

		{ path: "/login", element: <Login /> },
		{ path: "/register", element: <Register /> }
	]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
