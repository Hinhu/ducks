import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class ChangeNameDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: localStorage.getItem('name'),
        }
    }

    changeName = () => {
        localStorage.setItem('name', this.state.newName);
        this.props.handleClose();
    }

    handleInput = (e) => {
        this.setState({newName:e.value})
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
                            You can change your name here:
                            <input className="input" type="text" value={this.state.newName} onChange={this.handleInput}/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div onClick={this.changeName} className="button-text option danger">
                            SAVE
                        </div>
                        <div onClick={this.props.handleClose} className="button-text option">
                            CANCEL
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ChangeNameDialog;