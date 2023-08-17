import './navigation.css';

const Navigation = (): JSX.Element => {
	return (
		<div className="navigation">
			<div className="logo">
				<span>Clarity</span>
			</div>
			<div className="icons">
				<img className="icon" src="/icons/search-icon.svg" alt="" />
				<div className="notification">
					<img className="icon" src="/icons/notification-icon.svg" alt="" />
					<span>1</span>
				</div>
				<div className="user">
					<span>לואיש</span>
					<img 
						className='user-icon'
						src="https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
						alt="user profile image" 
					/>
				</div>
				<img  src="/icons/settings.svg" className="icon" alt="" />
			</div>
		</div>
	)
}

export default Navigation