import {
	createBrowserRouter,
	RouterProvider,
	Outlet
 } from "react-router-dom";
import Home from "./pages/home/Home";
import Expenses from "./pages/expenses/Expenses";
import Savings from "./pages/savings/Savings";
import Navigation from "./componenets/navigation/Navigation";
import Footer from "./componenets/footer/Footer";
import Menu from "./componenets/menu/Menu";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import './styles/global.css';

const App = () : JSX.Element => {

	const Layout = (): JSX.Element => {
		return (
			<div className="main">
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
				path: "expenses",
				element: <Expenses />
				},
				{
					path: "savings",
					element: <Savings />
				}]},
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
