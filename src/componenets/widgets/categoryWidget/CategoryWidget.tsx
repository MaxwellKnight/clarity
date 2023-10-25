import { Dropdown } from '../..';
import { useTranslation } from 'react-i18next';
import './categoryWidget.css';

type Option = { label: string, value: string };

type CategoryWidgetProps = { options: Option[] };
const CategoryWidget = ({ options }: CategoryWidgetProps) => {
	const { t } = useTranslation();

	return (
		<div className="category-widget">
		{options ?
			<div className='category-widget'>
				<Dropdown label={t("translation:category")} options={options} />
				<Dropdown options={options} />
				<Dropdown options={options} />
				<Dropdown options={options} />
			</div> : null
		}
		</div>
	)
}

export default CategoryWidget;