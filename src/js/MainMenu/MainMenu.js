import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Greeter from '../shared/Greeter';
import '../../css/App.css';
import '../../css/MainMenu.css';

class MainMenu extends Component {
    render() {
        return (
            <div>
                <Greeter />
                <div id="title">
                    DUCK
                    <br></br>
                    HUNTER
                </div>
                <div className="center">
                    <div className="margin">
                    <Link to="/game" className="link">
                        NEW GAME
                    </Link>
                    </div>
                    <div className="margin">
                    <Link to="/game" className="link">
                        CONTINUE
                    </Link>
                    </div>
                    <div className="margin">
                    <Link to="/upgrades" className="link">
                        UPGRADES
                    </Link>
                    </div>
                    <div className="margin">
                    <Link to="/rank" className="link">
                        RANKINGS
                    </Link>
                    </div>
                    <div className="margin">
                    <Link to="/settings" className="link">
                        SETTINGS
                    </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainMenu;