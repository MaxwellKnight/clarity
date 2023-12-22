import { useEffect, useState } from 'react';
import './table.css';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../utils';

type Data = {
	[label: string]: string | number
}

type TableProps = {
	caption: string,
	content: Data[],
	rowKey: string
}

const Table = ({ caption, content, rowKey}: TableProps): JSX.Element => {
	const { t } = useTranslation();
	const [headers, setHeaders] = useState<string[]>([]);
	const [rows, setRows] = useState<string[]>([]);

	useEffect(() => {
		if(!(content.length > 0 && rowKey in content[0])) return;
		setHeaders(() => 
			Object.keys(content[0]).map(header => header !== rowKey ? t(`translation:categories.${header}`) : '')
		);

		setRows(() => 
			Object.keys(content[0])
		);
	}, [content]);


	return(
		<div className='table-wrapper'>
		{content.length > 0 ? 
			<table className='table' role='table'>
				<caption role='table caption'>{caption}</caption>

				<tbody role='content'>
					<tr role='rowgroup'>
						{headers.map(header => <th key={header} role='row'>{header}</th>)}
					</tr>

					{content.map(column => 
						<tr role='rowgroup' key={JSON.stringify(column)}>
							{rows.map(row => <td data-cell={t(`translation:categories.${row}`)} role='row' key={row}>{row !== rowKey ? `${formatNumber(column[row])} ₪` : column[row]}</td>)}
						</tr>	
					)}
				</tbody>
			</table> : null}
		</div>
	)
};

export default Table;