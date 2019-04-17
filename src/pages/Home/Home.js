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
                        <MovieContainer.Popular name="PopularMovies" data={{ category: 1 }} meta={{ page: 1, limit: 1 }}>
                            {({items}) => (
                                <Fragment>
                                    {items.slice(0, 1).map(item => (
                                        <div className="slider-item">
                                            <div className="movie-info">
												<div className="tags">
													{item.genre_ids.map((item, i) => (
														<div className={`item  bg-color-${i + 1}`}>{genres.name(item)}</div>
													))}
												</div>
                                                <span>{item.original_title}</span>
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