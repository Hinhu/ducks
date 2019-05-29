import React from 'react';

export default () => {
    return (
        <div id="greeter" >
            Hello {localStorage.getItem('name')}
        </div>
    );
}

