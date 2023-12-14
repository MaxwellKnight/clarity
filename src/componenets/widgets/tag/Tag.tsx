import './tag.css';

type TagProps = {
	action: () => void
	label: string,
	color: string
}	
const Tag = ({ action, label, color }: TagProps) => {
	return (
		<div className="tag" style={{color}}>
			<p className="tag-label">{label}</p>
			<span onClick={action}>X</span>
		</div>
	)
}
export default Tag;