import React, {Component, Fragment} from 'react';

import MovieCard from "components/MovieCard";
import EntityContainer from "modules/entity/containers";

import qs from "query-string";
import {withRouter} from "react-router";


class List extends Component {

    _loadMore = (page) => {
        const { history, location } = this.props;
        const query = qs.parse(location.search);
        const search = { ...query, page: page };

        history.push({
            search: qs.stringify(search)
        });
    };

    render() {

        const { location, t, match } = this.props;
        const query = qs.parse(location.search);

        return (
            <div className="movies-list-wrapper">

                <div className="title">{match.params.slug} - Movies</div>

                <EntityContainer.All
                    entity="movie"
                    name="MoviesList"
                    url={`/movie/${match.params.slug}`}
                    params={{ page: query.page}}
                    appendIds
                >
                    {({items, meta, isFetched}) => {
                        return(
                            <>
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
                                {isFetched && meta.page < meta.total_pages && (
                                    <div className="flex--cen">
                                        <button className="main-btn" onClick={() => this._loadMore(meta.page + 1)}>Load more</button>
                                    </div>
                                )}
                            </>
                        )
                    }}
                </EntityContainer.All>

            </div>
        );
    }
}

export default withRouter(List);