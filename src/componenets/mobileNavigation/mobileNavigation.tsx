import { Link } from 'react-router-dom';
import { menu } from '../../data/menu.data';
import './mobileNavigation.css';
import { NotificationData } from '../../types';
import { Icon, Notifications } from '..';
import { useTranslation } from 'react-i18next';

interface MobileNavigationProps {
	notifications: NotificationData[],
	handleCloseNavbar: () => void,
}
const MobileNavigation = ({ notifications, handleCloseNavbar }: MobileNavigationProps) => {
	const { t } = useTranslation();
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
							<Icon 
								svg={{
									fill: '#ffff'
								}}
								name={listItem.url}
							/>
							<span className='list-item-title'>{t(`translation:menu.${listItem.title}`)}</span>
						</Link>
					))}
				</div>
			))}
		</div>
	)
};

export default MobileNavigation;