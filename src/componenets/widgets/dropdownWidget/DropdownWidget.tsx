import { Dropdown } from '../..';
import { useTranslation } from 'react-i18next';
import { Expense } from '../../../types';
import './dropdownWidget.css';

type Option = { label: string, value: string };
type GraphActions = { 
	add: (graph: Expense) => void, 
	remove: (key: number) => void
}
type DropdownWidgetProps = { 
	options: Option[], 
	dropdownCount: number,
	actions: GraphActions
};
const DropdownWidget = ({ options, dropdownCount, actions}: DropdownWidgetProps) => {
	const { t } = useTranslation();

	const getDropdowns = (options: Option[], count: number) => {
		const dropdowns = []
		for(let i = 0; i < count; i++){
			dropdowns.push(
				i === 0 ? 
					<Dropdown key={i} label={t("translation:category")} options={options}/> 
						:
					<Dropdown key={i} options={options} onClick={(category) => actions.add({
						isFixed: false,
						date: new Date(),
						category,
						value: 100
					})} />)
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