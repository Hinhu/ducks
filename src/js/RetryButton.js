import React, { Component } from 'react';

class RetryButton extends Component{
    
    render(){
        return (
            <div>
                <button onClick={this.props.onRetry} id="retry-button">Retry</button>
            </div>
        )
    }
}

export default RetryButton;