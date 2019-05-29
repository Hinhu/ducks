import React, { Component } from 'react';
import UpgradeDialog from './UpgradeDialog';
import Grid from '@material-ui/core/Grid';

class Upgrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }



    isBought = () => {
        return localStorage.getItem(this.props.type) === "true";
    }

    handleClick = () => {
        let cash = parseInt(localStorage.getItem("cash"));
        if (!this.isBought() && cash > this.props.price) {
            this.setState({ open: true });
        } else if (!this.isBought())
            alert("You don't have enough cash");
        else {
            this.props.handleBuy(this.props.type);
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        let selected = localStorage.getItem('bowType') === this.props.type;
        let description;
        description = (
            <Grid container direction="column" justify="flex-start" spacing={0}>
                <Grid item style={{ marginTop: "-20px" }}>
                    <span className="upgrade-title">{this.props.type} Bow</span>
                </Grid>
                <Grid item style={{ marginTop: "-20px" }}>
                    <span className="upgrade-description">{this.props.speedUp}% stretching speed up</span>
                </Grid>
            </Grid>
        );
        return (
            <div className="upgrade">
                <Grid container direction="row" justify="center" alignItems="center" spacing={16} onClick={this.handleClick}>
                    <Grid item style={selected ? { marginLeft: "48px" } : {}}>
                        <div className="box">
                            <img src={this.props.type === 'Turbo' ? require("../../img/turbo-bow.png") :
                                this.props.type === 'Super' ? require("../../img/super-bow.png") :
                                    this.props.type === 'Ultra' ? require("../../img/ultra-bow.png") :
                                        require("../../img/bow.png")} alt="BOW" width="60" height="60" style={{ marginTop: 5 }} />
                        </div>
                    </Grid>
                    <Grid item>
                        {description}
                    </Grid>
                    <Grid item style={{ marginLeft: "15px" }}>
                        {selected ? <span className="upgrade-no-price">SELECTED</span> :
                            this.isBought() ? <span className="upgrade-no-price">BOUGHT</span> : this.props.price}
                    </Grid>
                </Grid>
                {!this.isBought() &&
                    <UpgradeDialog
                        type={this.props.type}
                        price={this.props.price}
                        open={this.state.open}
                        handleClose={this.handleClose}
                        handleBuy={this.props.handleBuy}
                    />
                }
            </div>
        );
    }
}

export default Upgrade;