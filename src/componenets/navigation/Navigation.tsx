import './navigation.css';
import { UIConstants } from '../../constants';
import { useUIContext } from '../../context';
import { Notifications }  from '../../componenets';
import { useState } from 'react';

const notificationsData: {title: string, content: string}[] = [
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

const Navigation = () => {
	const { dispatch, ...state } = useUIContext();
	const [toggleNotification, setToggleNotification] = useState(false);
	const handleOpenNavbar = () => dispatch && dispatch({ type: UIConstants.OPEN_NAVBAR, ...state });

	return (
		<nav className="navigation">
			<div className="logo">
				<span>Clarity</span>
			</div>
			<div className="icons">
				<img className="icon" src="/icons/search-icon.svg" alt="" />
				<div className="notification" onClick={() => setToggleNotification((prev => !prev))}>
					<img className="icon" src="/icons/notification-icon.svg" alt="" />
					{notificationsData.length > 0 && <span>{notificationsData.length}</span>}
					{toggleNotification && 
						<Notifications 
							data={notificationsData}
						/>
					}
				</div>
				<div className="user">
					<img className="menu-icon" src="/icons/menu-icon.svg" alt="" onClick={handleOpenNavbar} />
					<span>Louish</span>
					<img 
						className='user-icon'
						src="https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
						alt="user profile image" 
					/>
				</div>
			</div>
		</nav>
	)
}

export default Navigation