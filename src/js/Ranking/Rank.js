import React, { Component } from 'react';

class Rank extends Component {
	render() {
		return (
			<tr className="margin">
				<td>
					{this.props.number+'.'}
				</td>
				<td>
					{this.props.name}
				</td>
				<td>
					{this.props.score}
				</td>
			</tr>
		);
	}
}

export default Rank;