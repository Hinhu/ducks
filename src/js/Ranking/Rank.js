import React from 'react';

export default (props) => {
	return (
		<tr className="margin">
			<td>
				{props.number + '.'}
			</td>
			<td>
				{props.name}
			</td>
			<td>
				{props.score}
			</td>
		</tr>
	);
}
