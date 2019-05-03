import React, {Component} from 'react';

import {List} from "./sections";

class MoviesList extends Component {
    render() {
        return (
            <div className="container">
                <List/>
            </div>
        );
    }
}

export default MoviesList;