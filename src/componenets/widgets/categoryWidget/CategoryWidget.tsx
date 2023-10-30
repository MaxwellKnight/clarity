import { Dropdown } from '../..';
import { useTranslation } from 'react-i18next';
import './categoryWidget.css';
import { Expense } from '../../../types';

type Option = { label: string, value: string };
type GraphActions = { 
	add: (graph: Expense[]) => void, 
	remove: (key: number) => void
}
type CategoryWidgetProps = { 
	options: Option[], 
	dropdownCount: number,
	graphActions: GraphActions
};
const CategoryWidget = ({ options, dropdownCount, graphActions}: CategoryWidgetProps) => {
	const { t } = useTranslation();

	const getDropdowns = (options: Option[], count: number) => {
		const dropdowns = []
		for(let i = 0; i < count; i++){
			dropdowns.push(
				i === 0 ? 
					<Dropdown key={i} label={t("translation:category")} options={options}/> 
						:
					<Dropdown key={i} options={options} onClick={(category) => graphActions.add([{
						isFixed: false,
						date: new Date(),
						category,
						value: 100
					}])} />)
		}
		return dropdowns;
	}

	return (
		<div className="category-widget">
			{options ? getDropdowns(options, dropdownCount) : null}
		</div>
	)
}

export default CategoryWidget;