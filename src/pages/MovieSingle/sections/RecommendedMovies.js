import React, {Component, Fragment} from 'react';

import EntityContainer from "modules/entity/containers";
import MovieCard from "components/MovieCard";

import {withRouter} from "react-router";


class RecommendedMovies extends Component {
    render() {

        const {match} = this.props;

        return (
            <div className="recommendations">
                <div className="movie-recommendations">
                    <div className="title">Recommended Movies</div>
                    <EntityContainer.All
                        entity="movie"
                        name="RecommendedMovies"
                        url={`/movie/${match.params.id}/recommendations`}
                        meta={{ page: 1 }}
                    >
                        {({items, meta, isFetched}) => {
                            return(
                                <Fragment>
                                    {isFetched ? (
                                        <Fragment>
                                            <div className="row-wrapper col-5">
                                                {items.map(movie => (
                                                    <MovieCard item={movie}/>
                                                ))}
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <div className="row-wrapper col-5">
                                            {[...Array(15)].map((item, i) => (
                                                <div key={i} className="col-item movie-card default-movie-card mb-30">
                                                    <div className="default-mask"/>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Fragment>
                            )
                        }}
                    </EntityContainer.All>
                </div>
            </div>
        );
    }
}

export default withRouter(RecommendedMovies);