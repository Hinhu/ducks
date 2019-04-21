import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css'
import '../css/MainMenu.css'

class MainMenu extends Component {
    render() {
        return (
            <div>
                <div id="title">
                    DUCK
                    <br></br>
                    HUNTER
                </div>
                <div class="center">
                    <Link to="/game" className="option">
                        NEW GAME
                    </Link>
                    <br></br>
                    <Link to="/game" class="option">
                        CONTINUE
                    </Link>
                    <br></br>
                    <Link to="/upgrades" class="option">
                        UPGRADES
                    </Link>
                    <br></br>
                    <Link to="/rank" class="option">
                        RANKINGS
                    </Link>
                    <br></br>
                    <Link to="/settings" class="option">
                        SETTINGS
                    </Link>
                </div>
            </div>
        );
    }
}

export default MainMenu;