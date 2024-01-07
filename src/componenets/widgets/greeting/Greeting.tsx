import { useTranslation } from 'react-i18next';
import './greeting.css';

const NOON = 12, EVENING = 18, MORNING = 5;

type GreetingWidgetProps = {
	day: Date,
	amount: number
};

const Greet = (): JSX.Element => {
	const { t } = useTranslation();
	const hour = new Date().getHours();
	let greeting = "", emoji = '☕️';

	if(MORNING < hour && hour <  NOON) greeting = "good_morning";
	else if(NOON < hour && hour < EVENING){
		greeting = "good_afternoon";
		emoji = '☀️'
	}
	else {
		greeting = "good_evening";
		emoji = '🌙'
	}
	return <p>{t(`translation:greeting.${greeting}`)}  {emoji}</p>;
}

const GreetingWidget = ({ day, amount }: GreetingWidgetProps) => {
	
	const { t } = useTranslation();
	const today = new Date();
	const timeDifference = day.getTime() - today.getTime();
	const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
	const prefix = 'translation:greeting';

	return (
		<div className="greeting">
			<p>{new Date().toLocaleDateString()}</p>
			<Greet />
			<p>{t(`${prefix}.left`)} {daysDifference} {t(`${prefix}.days`)} {t(`${prefix}.to_charge_day`)}! {t(`${prefix}.you_posses`)} <span>₪{amount} </span>{t(`${prefix}.for_spending`)} .</p>
		</div>
	)
};

export default GreetingWidget;