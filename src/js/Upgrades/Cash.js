import React, { Component } from 'react';

class Cash extends Component {

    render() {
        return (
            <div id="cash" >
                Cash: {localStorage.getItem('cash')}
            </div>
        );
    }
}

export default Cash;