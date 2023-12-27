import { motion } from 'framer-motion';
import './tag.css';
type TagProps = {
	action: () => void
	label: string,
	color: string
}	
const Tag = ({ action, label, color }: TagProps) => {
	return (
		<motion.div className="tag" style={{color}}
			initial={{ scale: 0}}
			animate={{scale: 1}}
			exit={{scale: 0}}
			transition={{type: "spring", duration: .5}}
			key="tag"
		>
			<p className="tag-label">{label}</p>
			<span onClick={action}>X</span>
		</motion.div>
	)
}
export default Tag;