import ReactDOM  from 'react-dom';
import { Link } from 'react-router-dom';
import { useUIContext } from '../../context/UIContext/UIContext';
import { menu } from '../../data/menu.data';
import { UIConstants } from '../../constants/ui_constants';
import './mobileNavigation.css';

const { CLOSE_NAVBAR } = UIConstants;

const MobileNavigation = () => {
	const { dispatch, ...uiState } = useUIContext();
	const closeNavbarAction = { type: CLOSE_NAVBAR, ...uiState }

	const handleCloseNavbar = () => dispatch && dispatch(closeNavbarAction);

	return ReactDOM.createPortal((
		<div className="mobile-navigation" onClick={handleCloseNavbar}>
			{menu.map((item) => (
				<div className="item" key={item.id}>
					{item.list_items.map((listItem) => (
						<Link 
							to={listItem.link}
							className={`list-item ${location.pathname === listItem.link ? 'active' : ''}`} 
							key={listItem.id}
						>
							<img src={listItem.url} alt="easy glanse" />
							<span className='list-item-title'>{listItem[`title_${uiState.lang.lang}`]}</span>
						</Link>
					))}
				</div>
			))}
		</div>
	), document.getElementById("root")!);
};

export default MobileNavigation;