import React, { Component } from 'react';
import GameCanvas from './GameCanvas'
import GameStats from './GameStats';

class Game extends Component {

	constructor(props){
		super(props);
		this.MAX_DUCKS_MISSED = 5;
		this.state = {
			level: 1,
			score: 0,
			bonusPoints: 0,
			missedDucksLeft: 5
		}
	}

	handleOnLevelUp = (newLevel) => {
		this.setState({level: newLevel});
	}

	handleOnPointsChange = (newScore, newBonusPoints) => {
		this.setState({score: newScore, bonusPoints: newBonusPoints});
	}

	handleOnDuckMissed = (missedDucks) => {
		this.setState({
			missedDucksLeft: this.MAX_DUCKS_MISSED - missedDucks
		})
	}

	render() {
		return (
			<div>
				<div id="game-canvas">
                    <GameCanvas onLevelUp={this.handleOnLevelUp}
								onPointsChange={this.handleOnPointsChange}
								onDuckMissed={this.handleOnDuckMissed}
								maxDucksMissed={this.MAX_DUCKS_MISSED}/>
				</div>
				<div id="game-stats">
				<GameStats level={this.state.level} 
							score={this.state.score} 
							bonusPoints={this.state.bonusPoints}
							missedShotsLeft={this.state.missedDucksLeft}/>
				</div>
			</div>
		);
	}
}

export default Game;