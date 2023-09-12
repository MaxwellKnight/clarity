import { Link } from 'react-router-dom';
import { menu } from '../../data/menu.data';
import './mobileNavigation.css';
import { useUIContext } from '../../context';

interface MobileNavigationProps {
	handleCloseNavbar: () => void,
}
const MobileNavigation = ({ handleCloseNavbar }: MobileNavigationProps) => {
	const ui = useUIContext();

	return (
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
							<span className='list-item-title'>{listItem[`title_${ui.lang.lang}`]}</span>
						</Link>
					))}
				</div>
			))}
		</div>
	)
};

export default MobileNavigation;