import React, {Component, Fragment} from 'react';

import config from "config";
import Credits from "./Credits";
import EntityContainer from "modules/entity/containers";

import {withRouter} from "react-router";


class MovieContent extends Component {
    render() {

        const {match} = this.props;

        return (
            <EntityContainer.One  entity="movie" name="Movie" url={`/movie/${match.params.id}`} id={Number(match.params.id)}>
                {({item, isFetched}) => {
                    return (
                        <Fragment>
                            {isFetched && (
                                <div className="movie-single-inner">
                                    <div className="movie-poster">
                                        <img src={`${config.API_IMAGE.original}/${item.poster_path}`} alt=""/>
                                    </div>
                                    <div className="movie-details">
                                        <div className="movie-title"><span>Title: </span>{item.title}</div>
                                        <div className="movie-description"><span>Overview:</span>{item.overview}</div>
                                        <div className="movie-item"><span>Date of release:</span>{item.release_date}</div>
                                        <div className="movie-item"><span>Budget:</span>$ {item.budget}</div>
                                        <ul className="movie-genres">
                                            {item.genres.map(g => (
                                                <li key={g.id}>{g.name}</li>
                                            ))}
                                        </ul>
                                        <Credits/>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    )
                }}
            </EntityContainer.One>
        );
    }
}

export default withRouter(MovieContent);