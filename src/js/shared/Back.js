import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div id="back-link" >
            <Link to="/" className="link" >
                BACK
                </Link>
        </div>
    );
}
