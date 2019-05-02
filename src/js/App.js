import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainMenu from './MainMenu.js';
import Game from './Game.js';
import Upgrades from './Upgrades.js';
import Ranking from './Ranking.js';
import Settings from './Settings.js';
import NotFound from './NotFound.js';


class App extends Component {
	componentDidMount(){
		if(!localStorage.getItem('name')){
			localStorage.setItem('name','PLAYER')
		}
	}

	render() {
		return (
			<div>
				<HashRouter>
					<Switch>
						<Route path="/" component={MainMenu} exact />
						<Route path="/game" component={Game} />
						<Route path="/upgrades" component={Upgrades} />
						<Route path="/rank" component={Ranking} />
						<Route path="/settings" component={Settings} />
						<Route component={NotFound} />
					</Switch>
				</HashRouter>
			</div>
		);
	}
}

export default App;
