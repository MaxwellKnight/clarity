import { Outlet } from 'react-router-dom';
import { Footer, Menu, Navigation } from '../../componenets';
import { AccountContextProvier, useTheme } from '../../context';
import './layout.css';
import { Suspense } from 'react';

export interface NotificationData {
	title: string,
	content: string
}

interface LayoutProps {
	isMobileNavOpen: boolean,
	notifications: NotificationData[],
	dir: string,
	closeMobileNav: () => void,
}

const Layout = ({isMobileNavOpen, notifications, closeMobileNav, dir}: LayoutProps): JSX.Element => {
	const { theme } = useTheme();
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className="main" data-type={theme} dir={dir}>
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
		</Suspense>
	)
}

export default Layout;