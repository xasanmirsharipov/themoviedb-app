import React, {Component} from 'react';

import genres from "services/genres";
import config from "config";

import {Link} from "react-router-dom";


class FullWidthSlider extends Component {
    render() {

        const {item} = this.props;

        return (
            <div className="slider-item" key={item.id}>
                <div className="movie-info">
                    <div className="tags mb-10">
                        {item.genre_ids.map((item, i) => (
                            <div className={`item  bg-color-${i + 1}`} key={item.id}>{genres.name(item)}</div>
                        ))}
                    </div>
                    <Link to={`/movie/${item.id}`} className="title-wrapper">
                        <div className="title">{item.original_title}</div>
                        <div className="subtitle">{item.overview.slice(0, 150)} {item.overview.length > 150 && '...'}</div>
                    </Link>
                    <ul className="movie-statistics flex">
                        <li><span>Vote count:</span>{item.vote_count}</li>
                        <li><span>Vote average:</span>{item.vote_average}</li>
                        <li><span>Popularity:</span>{item.popularity}</li>
                    </ul>
                </div>
                <div className="movie-img">
                    <Link to={'/'}>
                        <img src={`${config.API_IMAGE.medium}/${item.poster_path}`} alt=""/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default FullWidthSlider;