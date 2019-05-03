import React, {Component} from 'react';

import config from "config";
import {Link} from "react-router-dom";


class MovieCard extends Component {
    render() {

        const {item} = this.props;

        return (
            <div key={item.id} className="col-item movie-card mb-30">
                <img src={`${config.API_IMAGE.medium}/${item.poster_path}`} alt=""/>
                <div className="movie-content">
                    <div className="movie-title">{item.original_title}</div>
                    <div className="vote-average">{item.vote_average}</div>
                </div>
                <Link to={`/movie/${item.id}`} className="read-more"><span>View</span></Link>
            </div>
        );
    }
}

export default MovieCard;