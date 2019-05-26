import React, { Component } from 'react';
import Back from '../shared/Back';
import Cash from './Cash';
import Greeter from '../shared/Greeter';
import Upgrade from './Upgrade';
import '../../css/Upgrades.css';

class Upgrades extends Component {

	handleBuy = (type) =>{
		localStorage.setItem("bowType", type);
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
				<Upgrade type="Cedar" speedUp="0 " price="0" handleBuy={this.handleBuy}/>
				<Upgrade type="Turbo" speedUp="25" price="100" handleBuy={this.handleBuy}/>
				<Upgrade type="Super" speedUp="50" price="250" handleBuy={this.handleBuy}/>
				<Upgrade type="Ultra" speedUp="75" price="500" handleBuy={this.handleBuy}/>
				<Back />
			</div>
		);
	}
}

export default Upgrades;