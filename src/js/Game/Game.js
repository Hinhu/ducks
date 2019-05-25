import React, { Component } from 'react';
import GameCanvas from './GameCanvas'
import GameStats from './GameStats';
import GameOverDialog from './GameOverDialog'
import { Link } from 'react-router-dom';

class Game extends Component {

	constructor(props) {
		super(props);
		this.MAX_DUCKS_MISSED = 5;
		this.state = {
			level: 1,
			score: 0,
			bonusPoints: 0,
			missedDucksLeft: this.MAX_DUCKS_MISSED
		};
		
	}

	componentDidMount(){
		if(localStorage.getItem('gameState') !== 'null'){
			let gameState = JSON.parse(localStorage.getItem('gameState'))
			this.setState({
				level: gameState.level,
				score: gameState.score,
				bonusPoints: gameState.bonusPoints,
				missedDucksLeft: this.MAX_DUCKS_MISSED - gameState.missedDucks
			});
		}
	}

	handleOnLevelUp = (newLevel) => {
		this.setState({ level: newLevel });
	}

	handleOnPointsChange = (newScore, newBonusPoints) => {
		this.setState({ score: newScore, bonusPoints: newBonusPoints });
	}

	handleOnDuckMissed = (missedDucks) => {
		this.setState({
			missedDucksLeft: this.MAX_DUCKS_MISSED - missedDucks
		})
	}

	handleOnRetry = () => {
		this.refs.canvas.retryGame();
		this.setState({
			level: 1,
			score: 0,
			bonusPoints: 0,
			missedDucksLeft: this.MAX_DUCKS_MISSED
		})
	}

	handleOnSaveGameState = () => {
		let canvasState = this.refs.canvas.state;
		localStorage.setItem("gameState", JSON.stringify(canvasState));
	}

	render() {
		return (
			<div>
				<div id="game-canvas">
					<GameCanvas ref="canvas"
						onLevelUp={this.handleOnLevelUp}
						onPointsChange={this.handleOnPointsChange}
						onDuckMissed={this.handleOnDuckMissed}
						maxDucksMissed={this.MAX_DUCKS_MISSED}/>
				</div>
				<div id="game-stats">
					<GameStats level={this.state.level}
						score={this.state.score}
						bonusPoints={this.state.bonusPoints}
						missedShotsLeft={this.state.missedDucksLeft} />
				</div>
				<div>
					{this.state.missedDucksLeft === 0 &&
					<GameOverDialog
						score={this.state.score}
						cash={this.state.bonusPoints}
						onRetry={this.handleOnRetry}
					/>}
				</div>
				<div>
				<Link to="/" className="button-text text-gray" onClick={this.handleOnSaveGameState}>
                            BACK TO MENU
                        </Link>
				</div>
			</div>
		);
	}
}

export default Game;