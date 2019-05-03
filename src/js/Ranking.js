import React, { Component } from 'react';
import Rank from './Rank.js'
import Back from './Back.js'

class Ranking extends Component {

	componentWillMount() {
		let json = JSON.parse(localStorage.getItem("ranking")) || { ranking: [] };
		this.ranks = json.ranking;
		if (this.ranks.length < 5) {
			for (let i = this.ranks.length + 1; i <= 5; i++) {
				this.ranks.push({
					place: i,
					name: ".....",
					score: "..."
				})
			}
		}
	}

	render() {
		return (
			<div>
				<div id="title">
					RANKING
            	</div>
				<div className="center">
					{this.ranks.map((rank, i) => (
						<Rank number={rank.place} name={rank.name} score={rank.score} key={i} />
					))}
					<Back />
				</div>
			</div>
		);
	}
}

export default Ranking;