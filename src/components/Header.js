import React, {Component} from 'react';

import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="content">
                        <Link to={'/'} className="logo"><span>Movie</span></Link>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;