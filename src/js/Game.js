import React, { Component } from 'react';
import GameCanvas from './GameCanvas'
import GameStats from './GameStats';

class Game extends Component {

	constructor(props){
		super(props);
		this.state = {
			level: 1,
			score: 0,
			bonusPoints: 0
		}
	}

	handleOnLevelUp = (newLevel) => {
		this.setState({level: newLevel});
	}

	handleOnPointsChange = (newScore, newBonusPoints) => {
		this.setState({score: newScore, bonusPoints: newBonusPoints});
	}

	render() {
		return (
			<div>
				<div id="title">
                    <GameCanvas onLevelUp={this.handleOnLevelUp}
								onPointsChange={this.handleOnPointsChange}/>
				</div>
				<GameStats level={this.state.level} score={this.state.score} bonusPoints={this.state.bonusPoints}/>
			</div>
		);
	}
}

export default Game;