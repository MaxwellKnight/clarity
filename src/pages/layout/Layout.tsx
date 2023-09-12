import { Outlet } from 'react-router-dom';
import { Footer, Menu, Navigation } from '../../componenets';
import { AccountContextProvier, useUIContext } from '../../context';
import { NotificationData } from '../../types';
import './layout.css';

interface LayoutProps {
	isMobileNavOpen: boolean,
	notifications: NotificationData[]
	closeMobileNav: () => void,
}

const Layout = ({isMobileNavOpen, notifications, closeMobileNav}: LayoutProps): JSX.Element => {
	const ui = useUIContext();
	return (
		<div className="main" data-type={ui.theme} dir={ui.lang.dir}>
			<Navigation 
				isMobile={isMobileNavOpen}
				notifications={notifications} 
				closeMobileNav={closeMobileNav}
			/>
			<div className="container">
				<div className="menu-container">
					<Menu />
				</div>
				<main className="content-container">
					<AccountContextProvier>
						<Outlet />
					</AccountContextProvier>
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default Layout;