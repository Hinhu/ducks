import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


class DeleteSaveDialog extends Component {

    resetRanking = () =>{
        localStorage.removeItem("Turbo");
        localStorage.removeItem("Super");
        localStorage.removeItem("Ultra");
        localStorage.setItem("cash",0);
        localStorage.setItem('Cedar', true);
        localStorage.setItem('bowType', "Cedar");
        this.props.handleClose();
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
                            You will delete all your saved progress permanently.
                            Do you want to proceed?
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div onClick={this.resetRanking} className="button-text option danger">
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

export default DeleteSaveDialog;