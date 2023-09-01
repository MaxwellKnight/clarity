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
import { Navigation, Menu, Footer, MobileNavigation } from "./componenets";
import { useUIContext } from "./context/UIContext/UIContext";
import { UIConstants } from "./constants/ui_constants";
import './styles/global.css';

const { CLOSE_NAVBAR } = UIConstants

const App = () : JSX.Element => {
	const { dispatch, ...uiState } = useUIContext();
	const closeNavbarAction = { type: CLOSE_NAVBAR, ...uiState }
	const { theme, lang, isNavOpen} = uiState;

	const handleCloseNavbar = () => dispatch && dispatch(closeNavbarAction);
	const Layout = (): JSX.Element => {
		return (
			<div className="main" data-type={theme} dir={lang.dir}>
				<Navigation />
				{isNavOpen && <MobileNavigation handleCloseNavbar={handleCloseNavbar} uiState={uiState}/>}
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
