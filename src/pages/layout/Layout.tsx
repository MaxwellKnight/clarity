import { Outlet } from 'react-router-dom';
import { Footer, Menu, Navigation } from '../../componenets';
import { AccountContextProvier, useUIContext } from '../../context';
import './layout.css';
import { NotificationData } from '../../types';

interface LayoutProps {
	isMobileNavOpen: boolean,
	notifications: NotificationData[]
	closeMobileNav: () => void,
}

const Layout = ({isMobileNavOpen, notifications, closeMobileNav}: LayoutProps): JSX.Element => {
	const ui = useUIContext();
	return (
		<main className="main" data-type={ui.theme} dir={ui.lang.dir}>
			<Navigation 
				isMobile={isMobileNavOpen}
				notifications={notifications} 
				closeMobileNav={closeMobileNav}
			/>
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
		</main>
	)
}

export default Layout;