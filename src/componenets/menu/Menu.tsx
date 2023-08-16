import { Link } from 'react-router-dom';
import { menu } from '../../data/menu.data';
import './menu.css';

const Menu = (): JSX.Element => {
	return (
		<div className="menu">
			{menu.map((item) => (
				<div className="item" key={item.id}>
					<span className='title'>{item["title_he"]}</span>
					{item.list_items.map(listItem => (
						<Link to="/" className='list-item' key={listItem.id}>
							<span className='list-item-title'>{listItem["title_he"]}</span>
							<img src={listItem.url} alt="easy glanse" />
						</Link>
					))}
				</div>
			))}
		</div>
	)
}

export default Menu;