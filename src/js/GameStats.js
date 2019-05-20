import React, { Component } from 'react';

class GameStats extends Component {
    render() {
		return (
			<div>
				<div>
                    Level: {this.props.level}
                </div>
                <div>
                    Ducks hunted: {this.props.score}
                </div>
                <div>
                    Bonus points: {this.props.bonusPoints}
                </div>
                <div>{this.props.missedShotsLeft !== 0 ? <span>
                    Missed ducks left: {this.props.missedShotsLeft}</span> : ""}
                </div>
                
			</div>
		);
	}
}

export default GameStats;