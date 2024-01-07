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
			<section className="info-section">
				<div className="info-card">
					<table>
						<caption>Caption</caption>
						<tbody>
							<tr>
								<td>Example</td>
								<td>11576.7</td>
							</tr>
							<tr>
								<td>Example</td>
								<td>11576.7</td>
							</tr>
							<tr>
								<td>Example</td>
								<td>11576.7</td>
							</tr>
							<tr>
								<td>Example</td>
								<td>11,576.7</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="info-card">s</div>
				<div className="info-card">s</div>
			</section>
		</motion.main>
	)
}

export default Management;