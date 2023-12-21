import { useTranslation } from 'react-i18next';
import './dropdown.css';

interface BasicOption {
	value: string | number,
	label: string | number
}
interface DropdownProps<Option extends BasicOption> {
	className?: string,
	label?: string,
	options: Option[],
	defaultValue?: number,
	onClick?: (value: string) => void
}
const Dropdown = <Option extends BasicOption>({ className, label, options, defaultValue, onClick}: DropdownProps<Option>) => {
	const { t } = useTranslation();

	const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		onClick?.(e.target.value);
	}

	return (
		<div className={`dropdown ${className ? className: ''}`}>
			{ label && <p>{label}</p> }
			<select onChange={handleOnChange} defaultValue={defaultValue || 0}>
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