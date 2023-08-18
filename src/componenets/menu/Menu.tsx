import { Link } from 'react-router-dom';
import { menu } from '../../data/menu.data';
import './menu.css';
import { useContext, useState } from 'react';
import { UIContext } from '../../context/UIContext';
import { UIState } from '../../context/ui_context.types';

const Menu = (): JSX.Element => {
	const { lang } : { lang: UIState["lang"] } = useContext<UIState>(UIContext)
	const [active, setActive] = useState(0)

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
		e.preventDefault();
		setActive(index);
	}

	return (
		<div className="menu">
			{menu.map((item) => (
				<div className="item" key={item.id}>
					<span className='title'>{item[`title_${lang.lang}`]}</span>
					{item.list_items.map((listItem, index) => (
						<Link to={listItem.link} onClick={(e) => handleClick(e, index)}className={`list-item ${active === index ? 'active' : ''}`} key={listItem.id}>
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