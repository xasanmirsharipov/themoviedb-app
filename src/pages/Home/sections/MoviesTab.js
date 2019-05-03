import React, {Component, Fragment} from 'react';

import EntityContainer from "modules/entity/containers";
import MovieCard from "components/MovieCard";
import {Link} from "react-router-dom";


class MoviesTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            activeTabLink: {
                id: 1,
                title: 'Now playing',
                slug: 'now_playing'
            }
        }
    }

    toggleTab = (item) => {
        this.setState({
            activeTabLink: item
        })
    };

    render() {

        const movieTabLinks = [
            {
                id: 1,
                title: 'Now playing',
                slug: 'now_playing'
            },
            {
                id: 2,
                title: 'Popular',
                slug: 'popular'
            },
            {
                id: 3,
                title: 'Coming soon',
                slug: 'upcoming'
            },
            {
                id: 4,
                title: 'Top rated',
                slug: 'top_rated'
            },
        ];

        return (
            <div className="movies-list">
                <div className="container">
                    <div className="title-hd">
                        <h2>movies</h2>
                    </div>
                    <ul className="tab-links">
                        {movieTabLinks.map(item => (
                            <li
                                className={`${this.state.activeTabLink.id === item.id ? 'active' : ''}`}
                                onClick={() => this.toggleTab(item)}
                            >
                                <span>#{item.title}</span>
                            </li>
                        ))}
                    </ul>

                    <EntityContainer.All
                        entity="movie"
                        name="NowPlaying"
                        url={`/movie/${this.state.activeTabLink.slug}`}
                        meta={{ page: 1 }}
                        options={{slug: this.state.activeTabLink.slug}}
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
                                        <div className="row-wrapper col-6">
                                            {[...Array(15)].map((item, i) => (
                                                <div key={i} className="col-item movie-card default-movie-card mb-30">
                                                    <div className="default-mask"/>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {isFetched && (
                                        <div className="flex--cen">
                                            <Link className="main-btn" to={`/movies/${this.state.activeTabLink.slug}`}>View all</Link>
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

export default MoviesTab;