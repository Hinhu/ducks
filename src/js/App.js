import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainMenu from './MainMenu/MainMenu';
import Game from './Game/Game';
import Upgrades from './Upgrades/Upgrades';
import Ranking from './Ranking/Ranking';
import Settings from './Settings/Settings';
import NotFound from './shared/NotFound';


class App extends Component {
	componentWillMount(){
		if(!localStorage.getItem('name')){
			localStorage.setItem('name','PLAYER')
		}
		if(!localStorage.getItem('cash')){
			localStorage.setItem('cash',0)
		}
		localStorage.setItem('Normal', true);
		localStorage.setItem('bowType', "Normal");
		//if(!localStorage.getItem('gameState'))
		localStorage.setItem('gameState', null);
	}

	render() {
		return (
			<div>
				<HashRouter>
					<Switch>
						<Route path="/" component={MainMenu} exact />
						<Route path="/game" component={Game}/>
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
