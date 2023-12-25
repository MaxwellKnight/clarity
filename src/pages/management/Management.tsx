import { GreetingWidget } from '../../componenets';
import { motion } from 'framer-motion';
import './management.css';

const Management = () => {
	return(
		<motion.main 
			className="management-page"
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{duration: .5}}
		>
			<GreetingWidget day={new Date('1/10/2024')} amount={2500}/>
		</motion.main>
	)
}

export default Management;