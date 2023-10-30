import { Dropdown } from '../..';
import { useTranslation } from 'react-i18next';
import './dropdownWidget.css';

type Option = { label: string, value: string };
type Action = (label: string, key: number) => void
type DropdownWidgetProps = { 
	options: Option[], 
	dropdownCount: number,
	action: Action
};
const DropdownWidget = ({ options, dropdownCount, action}: DropdownWidgetProps) => {
	const { t } = useTranslation();

	const getDropdowns = (options: Option[], count: number) => {
		const dropdowns = []
		for(let i = 0; i < count; i++){
			dropdowns.push(
				<Dropdown 
					key={i} 
					label={i === 0 ? t("translation:category") : undefined} 
					options={options} 
					onClick={category => action(category, i)} 
				/>)
		}
		return dropdowns;
	}

	return (
		<div className="category-widget">
			{options ? getDropdowns(options, dropdownCount) : null}
		</div>
	)
}

export default DropdownWidget;