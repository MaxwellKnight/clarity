import './navigation.css';
import { UIConstants } from '../../constants/ui_constants';
import { useUIContext } from '../../context/UIContext/UIContext';
import { Notification }  from '../../componenets';

const Navigation = () => {
	const { dispatch, lang, theme } = useUIContext();
	const closeNavbarAction = { type: UIConstants.OPEN_NAVBAR, lang, theme }
	const handleOpenNavbar = () => dispatch && dispatch(closeNavbarAction);

	return (
		<nav className="navigation">
			<div className="logo">
				<span>Clarity</span>
			</div>
			<div className="icons">
				<img className="icon" src="/icons/search-icon.svg" alt="" />
				<div className="notification">
					<img className="icon" src="/icons/notification-icon.svg" alt="" />
					<span>1</span>
					<Notification />
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