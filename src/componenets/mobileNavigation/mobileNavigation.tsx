import { Link } from 'react-router-dom';
import { menu } from '../../data/menu.data';
import './mobileNavigation.css';
import { useUIContext } from '../../context';
import { NotificationData } from '../../types';
import { Notifications } from '..';

interface MobileNavigationProps {
	notifications: NotificationData[],
	handleCloseNavbar: () => void,
}
const MobileNavigation = ({ notifications, handleCloseNavbar }: MobileNavigationProps) => {
	const ui = useUIContext();

	return (
		<div className="mobile-navigation" onClick={handleCloseNavbar}>
			{notifications.length > 0 && <div className="navigation-item">
				<span className='notification-title'>התראות</span>
			</div>}
			<div className="navigation-item">
				<Notifications data={notifications}/>
			</div>
			{menu.map((item) => (
				<div className="navigation-item" key={item.id}>
					{item.list_items.map((listItem) => (
						<Link 
							to={listItem.link}
							className={`list-item ${location.pathname === listItem.link ? 'active' : ''}`} 
							key={listItem.id}
						>
							<img src={listItem.url} alt="easy glanse" />
							<span className='list-item-title'>{listItem[`title_${ui.lang.lang}`]}</span>
						</Link>
					))}
				</div>
			))}
		</div>
	)
};

export default MobileNavigation;