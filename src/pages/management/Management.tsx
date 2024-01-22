import { GreetingWidget } from '../../componenets';
import { motion } from 'framer-motion';
import InfoSection from './InfoSection';
import './management.css';
import { formatNumber } from '../../utils';

const Management = () => {

	const example = [
		{
			caption: "Checking",
			rows: [{label: "Balance", value: formatNumber(231312)}, {label: "Net Income", value: formatNumber(65644)}, {label: "example 3", value: formatNumber(31231312)},{label: "example 4", value: formatNumber(31231312)}, {label: "example 5", value: formatNumber(31231312)}]
		},
		{
			caption: "Caption 2",
			rows: [{label: "example 1", value: formatNumber(1123)}, {label: "example 2", value: formatNumber(31322)}, {label: "example 3", value: formatNumber(31231312)}, {label: "example 4", value: formatNumber(31231312)}, {label: "example 5", value: formatNumber(12346)}]
		},
		{
			caption: "Caption 3",
			rows: [{label: "example 1", value: formatNumber(1123)}, {label: "example 2", value: formatNumber(31322)}, {label: "example 3", value: formatNumber(31231312)}, {label: "example 4", value: formatNumber(34656)}, {label: "example 5", value: formatNumber(74654)}]
		}
	];


	return(
		<motion.main 
			className="management-page"
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{duration: .5}}
		>
			<GreetingWidget day={new Date('1/10/2024')} amount={2500}/>
			<InfoSection data={example}/>
		</motion.main>
	)
}

export default Management;