import './home.css';
import { generateColors } from '../../utils/colors.utils';
import { pieChartData, income, expense } from '../../data/pie_chart.data';
import { CategoryBox, ChartBox, CheckingBox, PieBox } from '../../componenets';
import { getCheckingHistory } from '../../data/checking_box.data';
import { CheckingHistoryData } from '../../types';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

const colors: string[] = generateColors(pieChartData.length);

const Home = () : JSX.Element => {
	const { t } = useTranslation();
	const checkingHistory: CheckingHistoryData[] = getCheckingHistory(t);
	return (
		<AnimatePresence>
			<motion.div 
				className="home"  
				exit={{scale: 0}}
				transition={{duration: .3}}
			>
				<motion.div className="box box-1"
					initial={{y: "-100%", opacity: 0}}
					animate={{y: "0", opacity: 1}}
					exit={{y: "100%", opacity: 0}}
					transition={{duration: .5}}
				>
					<ChartBox title="income" label={income} flux='negative'/>
				</motion.div>
				<motion.div className="box box-2"
					initial={{x: "-100%", opacity: 0}}
					animate={{x: "0", opacity: 1}}
					exit={{x: "100%", opacity: 0}}
					transition={{duration: .5}}
				>
					<ChartBox title="expenses" label={expense} flux='positive'/>	
				</motion.div>
				<motion.div className="box box-3"
					initial={{y: "-100%", opacity: 0}}
					animate={{y: "0", opacity: 1}}
					exit={{y: "100%", opacity: 0}}
					transition={{duration: .5}}
				>
					<PieBox categories={pieChartData} colors={colors}/>
					<span className='pie-total'>{pieChartData.reduce((acc, curr) => acc + curr.value, 0)}</span>
				</motion.div>
				<motion.div className="box box-4"
					initial={{y: "100%", opacity: 0}}
					animate={{y: "0", opacity: 1}}
					exit={{y: "100%", opacity: 0}}
					transition={{duration: .5}}
				>
					<CategoryBox categories={pieChartData} colors={colors}/>
				</motion.div>
				<motion.div className="box box-5"
					initial={{y: "100%", opacity: 0}}
					animate={{y: "0", opacity: 1}}
					exit={{y: "100%", opacity: 0}}
					transition={{duration: .5}}
				>
					<CheckingBox data={checkingHistory}/>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}

export default Home;