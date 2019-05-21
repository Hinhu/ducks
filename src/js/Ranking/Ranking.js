import React, { Component } from 'react';
import Rank from './Rank'
import Back from '../shared/Back'
import Greeter from '../shared/Greeter'

class Ranking extends Component {

	componentWillMount() {
		let json = JSON.parse(localStorage.getItem("ranking")) || { ranking: [] };
		this.ranks = json.ranking;
		if (this.ranks.length < 5) {
			for (let i = this.ranks.length + 1; i <= 5; i++) {
				this.ranks.push({
					name: ".....",
					score: "..."
				})
			}
		}
	}

	render() {
		return (
			<div>
				<Greeter />
				<div id="title">
					RANKING
            	</div>
				<div className="center">
					<table className="center">
						{this.ranks.map((rank, i) => (
							<Rank number={i+1} name={rank.name} score={rank.score} key={i} />
						))}
					</table>
					<Back />
				</div>
			</div>
		);
	}
}

export default Ranking;