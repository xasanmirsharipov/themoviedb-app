import React, {Component} from 'react';

import Header from "components/Header";

class Layout extends Component {
    render() {

        return (
            <div className="body-wrapper">
                <Header/>
                <div className="content-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;