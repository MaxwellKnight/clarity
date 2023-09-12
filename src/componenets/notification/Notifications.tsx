import { ReactNode } from 'react';
import './notifications.css';
import { NotificationData } from '../../types';

interface NotificationsProps {
	data: NotificationData[],
	children?: ReactNode
}

const Notifications = ({ data }: NotificationsProps) => {
	return (
		<div className="notification-box">
			<ul>
				{data.map((notification, index) => (
					<li key={index}>
						<span>{notification.title}</span>
						<p>{notification.content}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
export default Notifications;