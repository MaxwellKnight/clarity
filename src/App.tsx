import {
	createBrowserRouter,
	RouterProvider,
	Outlet
 } from "react-router-dom";
import {	Budget,
			Expenses,
			Home,
			Login,
			Register,
			Savings
} from "./pages";
import './styles/global.css';
import { UIContext } from "./context";
import { useContext } from "react";
import { UIState } from "./types";
import { Navigation, Menu, Footer } from "./componenets";

const App = () : JSX.Element => {
	const { lang, theme } : UIState = useContext(UIContext);

	const Layout = (): JSX.Element => {
		return (
			<div className="main" data-type={theme} dir={lang.dir}>
				<Navigation />
				<div className="container">
					<div className="menu-container">
						<Menu />
					</div>
					<div className="content-container">
						<Outlet />
					</div>
				</div>
				<Footer />
			</div>
		)
	}

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
				path: "/",
				element: <Home />
				},
				{
				path: "/expenses",
				element: <Expenses />
				},
				{
					path: "/savings",
					element: <Savings />
				},
				{
					path: "/budget",
					element: <Budget />
				}
				]},
		{
			path: "/login",
			element: <Login />
		},
		{
			path: "/register",
			element: <Register />
		}
	]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
