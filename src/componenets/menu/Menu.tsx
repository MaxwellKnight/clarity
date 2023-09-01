import { Link, Location, useLocation } from 'react-router-dom';
import { menu } from '../../data/menu.data';
import './menu.css';
import { useUIContext } from '../../context/UIContext/UIContext';

const Menu = (): JSX.Element => {
	const { lang } = useUIContext();
	const location : Location = useLocation();

	return (
		<div className="menu">
			{menu.map((item) => (
				<div className="item" key={item.id}>
					<span className='title'>{item[`title_${lang.lang}`]}</span>
					{item.list_items.map((listItem) => (
						<Link 
							to={listItem.link}
							className={`list-item ${location.pathname === listItem.link ? 'active' : ''}`} 
							key={listItem.id}
						>
							<img src={listItem.url} alt="easy glanse" />
							<span className='list-item-title'>{listItem[`title_${lang.lang}`]}</span>
						</Link>
					))}
				</div>
			))}
		</div>
	)
}

export default Menu;