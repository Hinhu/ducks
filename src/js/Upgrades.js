import React, { Component } from 'react';
import Back from './Back.js';
import Cash from './Cash.js';
import Greeter from './Greeter.js';
import '../css/Upgrades.css';

class Upgrades extends Component {
	render() {
		return (
			<div>
				<Cash />
				<Greeter />
				<div id="title">
                    UPGRADES
                </div>
				<Back />
			</div>
		);
	}
}

export default Upgrades;