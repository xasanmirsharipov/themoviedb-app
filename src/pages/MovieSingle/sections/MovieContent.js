import React, {Component, Fragment} from 'react';

import config from "config";
import Credits from "./Credits";
import EntityContainer from "modules/entity/containers";

import get from "lodash/get";
import {withRouter} from "react-router";


class MovieContent extends Component {
    render() {

        const {match} = this.props;

        return (
            <EntityContainer.One  entity="movie" name="Movie" url={`/movie/${match.params.id}`} id={Number(match.params.id)}>
                {({item, isFetched}) => {
                    return (
                        <Fragment>
                            <div className="movie-single-inner">
                                <div className="movie-poster">
                                    {isFetched ? (
                                        <img src={`${config.API_IMAGE.original}/${item.poster_path}`} alt=""/>
                                    ) : (
                                        <div className="no-photo"><div className="img"/></div>
                                    )}
                                </div>
                                <div className="movie-details">
                                    <div className="movie-title"><span>Title: </span>{get(item, 'title')}</div>
                                    <div className="movie-description"><span>Overview:</span>{get(item, 'overview')}</div>
                                    <div className="movie-item"><span>Date of release:</span>{get(item, 'release_date')}</div>
                                    <div className="movie-item"><span>Budget:</span>$ {get(item, 'budget')}</div>
                                    <ul className="movie-genres">
                                        {isFetched && item.genres.map(g => (
                                            <li key={g.id}>{g.name}</li>
                                        ))}
                                    </ul>
                                    <Credits/>
                                </div>
                            </div>
                        </Fragment>
                    )
                }}
            </EntityContainer.One>
        );
    }
}

export default withRouter(MovieContent);