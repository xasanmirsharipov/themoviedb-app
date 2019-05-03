import React, {Component} from 'react';

import {MovieContent, RecommendedMovies} from "./sections";


class MovieSingle extends Component {
    render() {
        return (
            <div className="container">
                <div className="movie-single">
                    <MovieContent/>
                </div>
                <RecommendedMovies/>
            </div>
        );
    }
}

export default MovieSingle;