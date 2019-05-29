import React from 'react';

export default () => {
        return (
            <div id="cash" >
                Cash: {localStorage.getItem('cash')}
            </div>
        );
    }
