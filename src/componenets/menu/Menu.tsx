import { Link, Location, useLocation } from 'react-router-dom';
import { menu } from '../../data/menu.data';
import { Icon } from '../../componenets';
import './menu.css';
import { useTranslation } from 'react-i18next';

const Menu = (): JSX.Element => {
	const location : Location = useLocation();
	const { t } = useTranslation();
	return (
		<div className="menu">
			{menu.map((item) => (
				<div className="item" key={item.id}>
					<span className='title'>{t('translation:menu.quick_menu')}</span>
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
}

export default Menu;