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

    isBougth = () => {
        return localStorage.getItem(this.props.type) === "true";
    }

    handleClick = () => {
        let cash = parseInt(localStorage.getItem("cash"));
        if (!this.isBougth() && cash > this.props.price) {
            this.setState({ open: true });
        } else {
            if (!this.isBougth()) {
                alert("You don't have enough cash");
            }
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        let description;
        let bought;
        if (this.isBougth()) {
            description = (<div className="upgrade-bought">BOUGHT</div>);
            bought = true;
        } else {
            description = (
                <Grid container direction="column" justify="flex-start" spacing={0}>
                    <Grid item style={{ marginTop: "-20px" }}>
                        <span className="upgrade-title">{this.props.type} Bow</span>
                    </Grid>
                    <Grid item style={{ marginTop: "-20px" }}>
                        <span className="upgrade-description">{this.props.speedUp}% reload speed up</span>
                    </Grid>
                </Grid>
            );
            bought = false;
        }
        return (
            <div className="upgrade">
                <Grid container direction="row" justify="center" alignItems="center" spacing={16} onClick={this.handleClick}>
                    <Grid item style={bought ? { marginLeft: "-76px" } : {}}>
                        <div className="box">
                        </div>
                    </Grid>
                    <Grid item>
                        {description}
                    </Grid>
                    <Grid item style={{ marginLeft: "15px" }}>
                        {bought ? <div></div> : this.props.price}
                    </Grid>
                </Grid>
                {bought ?
                    <div></div>
                    :
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