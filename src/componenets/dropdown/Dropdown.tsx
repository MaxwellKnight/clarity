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
	onClick?: (value: string) => void
}
const Dropdown = <Option extends BasicOption>({ className, label, options, onClick}: DropdownProps<Option>) => {
	const { t } = useTranslation();

	return (
		<div className={`dropdown ${className ? className: ''}`}>
			<p>{label}</p>
			<select onChange={(e) => onClick && onClick(e.target.value)} defaultValue={0}>
				{options.map((option, index) => 
					<option key={index} value={option.value}>
						{t(option.label.toString())}	
					</option>
				)}
			</select>
		</div>
	)
};

export default Dropdown;