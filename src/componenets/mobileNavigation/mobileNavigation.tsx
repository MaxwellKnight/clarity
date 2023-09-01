import ReactDOM  from 'react-dom';
import { Link } from 'react-router-dom';
import { menu } from '../../data/menu.data';
import './mobileNavigation.css';
import { UIState } from '../../types';

interface Props {
	uiState: UIState,
	handleCloseNavbar: () => void,
}
const MobileNavigation = ({ uiState, handleCloseNavbar }: Props) => {

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