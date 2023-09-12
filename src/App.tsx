import {
	createBrowserRouter,
	RouterProvider,
	Outlet
 } from "react-router-dom";
import {	
	Budget,
	Expenses,
	Home,
	Login,
	Register,
	Savings
} from "./pages";
import { useState } from "react";
import { useUIContext } from "./context";
import { NotificationData } from "./types";
import { AccountContextProvier } from "./context";
import { Navigation, Menu, Footer } from "./componenets";
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
	const { dispatch, ...ui } = useUIContext();
	const [isMobileNavOpen, toggleIsNavOpen] = useState(false);

	const handleToggle = () => toggleIsNavOpen(prev => !prev);

	const Layout = (): JSX.Element => {
		return (
			<div className="main" data-type={ui.theme} dir={ui.lang.dir}>
				<Navigation isMobile={isMobileNavOpen} notifications={notificationsData} closeMobileNav={handleToggle}/>
				<div className="container">
					<div className="menu-container">
						<Menu />
					</div>
					<div className="content-container">
						<AccountContextProvier>
							<Outlet />
						</AccountContextProvier>
					</div>
				</div>
				<Footer />
			</div>
		)
	}

	const router = createBrowserRouter([{
		path: "/",
		element: <Layout />,
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
