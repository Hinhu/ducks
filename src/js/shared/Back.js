import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Back extends Component {

    render() {
        return (
            <div id="back-link" >
                <Link to="/" className="link" >
                    BACK
                </Link>
            </div>
        );
    }
}

export default Back;