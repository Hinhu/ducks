import React, { Component } from 'react';

class Greeter extends Component {

    render() {
        return (
            <div id="greeter" >
                Hello {localStorage.getItem('name')}
            </div>
        );
    }
}

export default Greeter;