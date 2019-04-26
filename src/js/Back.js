import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {


    render() {
        return (
            <div style={{ marginTop: "10vh" }} >
                <Link to="/" className="link" >
                    BACK
                </Link>
            </div>
        );
    }
}

export default Ranking;