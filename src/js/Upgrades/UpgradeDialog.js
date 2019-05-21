import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


class UpgradeDialog extends Component {

    confirmBuy = () =>{
        let cash=parseInt(localStorage.getItem("cash"));
        cash-=this.props.price;
        localStorage.setItem('cash',cash);
        localStorage.setItem(this.props.type,"true");
        this.props.handleBuy();
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}                    
                >
                    <DialogContent>
                        <div className="dialog-text">
                            Are you sure you want to buy the {this.props.type} Bow?
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div onClick={this.confirmBuy} className="button-text option danger">
                            YES
                        </div>
                        <div onClick={this.props.handleClose} className="button-text option">
                            NO
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default UpgradeDialog;