import React, { Component } from 'react';

class Rank extends Component {
	render() {
		return (
			<div className="margin">
                {this.props.number+'. '+this.props.name+' '+this.props.score}
			</div>
		);
	}
}

export default Rank;