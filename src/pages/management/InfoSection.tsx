import './_infoSection.css';

export type SectionData = {
	caption: string;
	rows: {
		label: string;
		value: string | number;
	}[];
}
type InfoSectionProps = {
	data: SectionData[];
}

const InfoSection = ({ data }: InfoSectionProps) => {
	return(
		<section className="info-section">
				{data.map((table, i) => 
					<div key={i} className="info-card">
						<table>
							<caption>{table.caption}</caption>
							<tbody>
								{table.rows.map((row, i) => 
									<tr key={i}>
										<td>{row.label}</td>
										<td>{row.value}</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)}
		</section>
	)
}

export default InfoSection;