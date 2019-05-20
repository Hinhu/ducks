import React, { Component } from 'react';
import Back from './Back.js';
import Cash from './Cash.js';
import Greeter from './Greeter.js';
import Upgrade from './Upgrade.js';
import '../css/Upgrades.css';

class Upgrades extends Component {

	handleBuy = () =>{
		this.forceUpdate();
	}
	render() {
		return (
			<div>
				<Cash />
				<Greeter />
				<div id="title">
                    UPGRADES
                </div>
				<Upgrade type="Turbo" speedUp="25" price="100" handleBuy={this.handleBuy}/>
				<Upgrade type="Super" speedUp="50" price="250" handleBuy={this.handleBuy}/>
				<Upgrade type="Ultra" speedUp="75" price="500" handleBuy={this.handleBuy}/>
				<Back />
			</div>
		);
	}
}

export default Upgrades;