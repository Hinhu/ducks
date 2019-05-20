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
                <div>
                    Missed ducks left: {this.props.missedShotsLeft}
                </div>
                
			</div>
		);
	}
}

export default GameStats;