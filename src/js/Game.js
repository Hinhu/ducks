import React, { Component } from 'react';
import GameCanvas from './GameCanvas'

class Game extends Component {
	render() {
		return (
			<div>
				<div id="title">
                    
					<GameCanvas/>
                </div>
			</div>
		);
	}
}

export default Game;