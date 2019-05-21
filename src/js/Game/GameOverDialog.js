import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Link } from 'react-router-dom';



class GameOverDialog extends Component {

    componentWillMount() {
        localStorage.setItem('cash', parseInt(localStorage.getItem('cash')) + this.props.cash);
        let ranking = JSON.parse(localStorage.getItem("ranking")) || { ranking: [] };
        ranking = ranking.ranking;
        const score = this.props.score;
        for (var i = 0; i < ranking.length; i++) {
            if (score > ranking[i].score) {
                this.place = i + 1;
                let rank= {
                    name: localStorage.getItem('name'),
                    score: score
                }
                ranking.splice(i,0,rank);
                if(ranking.length>5){
                    ranking.pop();
                }
                break;
            }
        }
        if (!this.place && i<5) {
            this.place = i+1;
            let rank= {
                name: localStorage.getItem('name'),
                score: score
            }
            ranking.splice(i,0,rank);
        }
        localStorage.setItem('ranking', JSON.stringify({ ranking: ranking }))
    }

    render() {
        return (
            <div>
                <Dialog
                    open={true}
                    fullWidth={true}
                    maxWidth={'md'}
                >
                    <DialogContent>
                        <div className="big-dialog-text">
                            GAME OVER
                        </div>
                        <div className="dialog-text" style={{ textAlign: "center" }}>
                            {this.place ? 
                                <span>You've got the {this.place} place!</span> 
                            :
                                <span>You haven't made into hall of fame...</span>
                            }
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div onClick={this.props.onRetry} className="button-text option">
                            RETRY
                        </div>
                        <Link to="/" className="button-text option danger" >
                            BACK
                        </Link>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default GameOverDialog;