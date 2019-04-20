import React, {Component, Fragment} from 'react';

import MovieContainer from "modules/movie/containers";
import config from "../../config";


class MovieSingle extends Component {
    render() {

        const {match} = this.props;

        return (
            <div className="movie-single">

                <MovieContainer.One url={`/movie/${match.params.id}`} id={Number(match.params.id)}>
                    {({item, isFetched}) => {
                        return (
                            <Fragment>
                                {isFetched && (
                                    <Fragment>
                                        <div className="top-bg-wrapper">
                                            <img src={`${config.API_IMAGE.original}/${item.backdrop_path}`} alt=""/>
                                        </div>
                                    </Fragment>
                                )}
                            </Fragment>
                        )
                    }}
                </MovieContainer.One>

            </div>
        );
    }
}

export default MovieSingle;