import { useTranslation } from 'react-i18next';
import './dropdown.css';

interface BasicOption {
	value: string | number,
	label: string | number
}
interface DropdownProps<Option extends BasicOption> {
	className?: string,
	label: string,
	options: Option[],
	onClick?: (option: Option) => void
}
const Dropdown = <Option extends BasicOption>({
	className, 
	label, 
	options
}: DropdownProps<Option>) => {
	const { t } = useTranslation();
	return (
		<div className={`dropdown ${className ? className: ''}`}>
			<p>{label}</p>
			<select>
				{options.map((option, index) => 
					<option key={index} value={option.value}>
						{t(`translation:months_full.${option.label}`)}	
					</option>
				)}
			</select>
		</div>
	)
};

export default Dropdown;