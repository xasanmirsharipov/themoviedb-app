import React, {Component, Fragment} from "react";

import MovieContainer from "modules/movie/containers";
import config from "config";
import {Link} from "react-router-dom";
import {genres} from 'services';

class Home extends Component {

	render(){



		return (
			<>
				<div className="slider_v1 popular-slider">

					<div className="container">
                        <MovieContainer.Popular name="PopularMovies" data={{ category: 1 }} meta={{ page: 1 }}>
                            {({items}) => (
                                <Fragment>
                                    {items.slice(0, 1).map(item => (
                                        <div className="slider-item" key={item.id}>
                                            <div className="movie-info">
												<div className="tags mb-10">
													{item.genre_ids.map((item, i) => (
														<div className={`item  bg-color-${i + 1}`} key={item.id}>{genres.name(item)}</div>
													))}
												</div>
                                                <Link to={`/${item.original_title}`} className="title-wrapper">
                                                    <div className="title">{item.original_title}</div>
													<div className="subtitle">{item.overview}</div>
												</Link>
												<ul className="movie-statistics">
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
                                    ))}
                                </Fragment>
                            )}
                        </MovieContainer.Popular>


					</div>

                </div>
			</>
		);
	}

}

export default Home;