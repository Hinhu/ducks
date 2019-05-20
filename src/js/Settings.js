import React, { Component } from 'react';
import '../css/Settings.css'
import Greeter from './Greeter.js'
import Back from './Back.js'
import ChangeNameDialog from './ChangeNameDialog.js'
import ResetRankingDialog from './ResetRankingDialog.js'
import DeleteSaveDialog from './DeleteSaveDialog.js'
import Grid from '@material-ui/core/Grid';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sound: localStorage.getItem("sound") || 'active',
			map: localStorage.getItem("map") || 'forest',
			openChangeNameDialog: false,
			openResetRankingDialog: false,
			openDeleteSaveDialog: false
		}
		this.maps = ['forest', 'lake', 'city']
	}

	handleSound = () => {
		let newValue = this.state.sound === 'active' ? 'disabled' : 'active';
		localStorage.setItem("sound", newValue);
		this.setState({ sound: newValue });
	}

	nextMap = () => {
		let currentMapIndex=this.maps.indexOf(this.state.map);
		let newMapIndex=currentMapIndex+1;
		if(newMapIndex===this.maps.length){
			newMapIndex=0;
		}
		let newMap=this.maps[newMapIndex];
		localStorage.setItem("map", newMap);
		this.setState({map:newMap});
	}

	prevMap = () =>{
		let currentMapIndex=this.maps.indexOf(this.state.map);
		let newMapIndex=currentMapIndex-1;
		if(newMapIndex===-1){
			newMapIndex=this.maps.length-1;
		}
		let newMap=this.maps[newMapIndex];
		localStorage.setItem("map", newMap);
		this.setState({map:newMap});
	}

	openResetRankingDialog = () =>{
		this.setState({openResetRankingDialog:true})
	}

	closeResetRankingDialog = () =>{
		this.setState({openResetRankingDialog:false})
	}

	openDeleteSaveDialog = () =>{
		this.setState({openDeleteSaveDialog:true})
	}

	closeDeleteSaveDialog = () =>{
		this.setState({openDeleteSaveDialog:false})
	}

	openChangeNameDialog = () =>{
		this.setState({openChangeNameDialog:true})
	}

	closeChangeNameDialog = () =>{
		this.setState({openChangeNameDialog:false})
	}


	render() {
		return (
			<div>
				<Greeter />
				<div id="title">
					SETTINGS
				</div>
				<Grid container direction="row" justify="center" alignItems="center">
					<Grid item sm={10} md={8} lg={6}>
						<Grid container direction="column" justify="flex-start" alignItems="stretch" >
							<Grid item>
								<Grid container direction="row" justify="space-between" alignItems="center">
									<Grid item>
										SOUND:
									</Grid>
									<Grid item className="option" onClick={this.handleSound}>
										{this.state.sound === 'active' ? ' ON' : ' OFF'}
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								<Grid container direction="row" justify="space-between" alignItems="center">
									<Grid item>
										MAP:
										</Grid>
									<Grid item>
										<span className="option" onClick={this.prevMap}>&lsaquo;</span>
										{' '+this.state.map+' '}
										<span className="option" onClick={this.nextMap}>&rsaquo;</span>
									</Grid>
								</Grid>
							</Grid>
							<Grid item style={{marginTop:"30px"}} >
								<div className="option" onClick={this.openChangeNameDialog}>
									CHANGE NAME
								</div>
								<div className="danger option" onClick={this.openResetRankingDialog}>
									RESET RANKING
								</div>
								<div className="danger option" onClick={this.openDeleteSaveDialog}>
									DELETE SAVE
								</div>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Back />
				<ChangeNameDialog open={this.state.openChangeNameDialog} handleClose={this.closeChangeNameDialog}/>
				<ResetRankingDialog open={this.state.openResetRankingDialog} handleClose={this.closeResetRankingDialog}/>
				<DeleteSaveDialog open={this.state.openDeleteSaveDialog} handleClose={this.closeDeleteSaveDialog}/>
			</div >
		);
	}
}

export default Settings;