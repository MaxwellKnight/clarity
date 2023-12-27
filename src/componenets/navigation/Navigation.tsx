import './navigation.css';
import { useState } from 'react';
import { NotificationData } from '../../types';
import { MobileNavigation, Notifications }  from '../../componenets';

interface NavigationProps {
	isMobile: boolean,
	notifications: NotificationData[],
	closeMobileNav: () => void
}

const Navigation = ({isMobile, notifications, closeMobileNav}: NavigationProps) => {
	const [toggleNotification, setToggleNotification] = useState(false);
	const handleToggleNotifications = () => setToggleNotification(prev => !prev)
	
	return (!isMobile ? 
		<nav className="navigation">
			<div className="logo">
				<span>Clarity</span>
			</div>
			<div className="icons">
				<img className="icon" src="/icons/search-icon.svg" alt="" />
				<div className="notification">
					<img 
						className="icon" 
						src="/icons/notification-icon.svg" 
						alt="notification icon" 
						onClick={handleToggleNotifications}
					/>
					{notifications.length > 0 && <span>{notifications.length}</span>}
					{toggleNotification && <Notifications data={notifications}/> }
				</div>
				<div className="user">
					<img className="menu-icon" src="/icons/menu-icon.svg" alt="" onClick={closeMobileNav} />
					<span>Louish</span>
					<img 
						className='user-icon'
						src="https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
						alt="user profile image" 
					/>
				</div>
			</div>
		</nav> : <MobileNavigation notifications={notifications} handleCloseNavbar={closeMobileNav} />
	)
}

export default Navigation