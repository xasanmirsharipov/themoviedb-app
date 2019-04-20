import React, {Component, Fragment} from "react";

import MovieContainer from "modules/movie/containers";
import config from "config";
import {Link} from "react-router-dom";
import {genres} from 'services';
import Swiper from 'react-id-swiper';
import { Navigation } from 'swiper/dist/js/swiper.esm'

class Home extends Component {

	render(){

		const params = {
			slidesPerView: 1,
			centeredSlides: true,
			effect: 'slide',
			modules: [Navigation],
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},

		};

		return (
			<>
				<div className="slider_v1 popular-slider">
					<div className="container">
                        <MovieContainer.Popular name="PopularMovies" data={{ category: 1 }} meta={{ page: 1, limit: 1 }}>
                            {({items, isFetched}) => (
                                <Fragment>
									{isFetched && (
										<div>
											<Swiper {...params}>
												{items.slice(0, 5).map(item => (
													<div className="slider-item" key={item.id}>
														<div className="movie-info">
															<div className="tags mb-10">
																{item.genre_ids.map((item, i) => (
																	<div className={`item  bg-color-${i + 1}`} key={item.id}>{genres.name(item)}</div>
																))}
															</div>
															<Link to={`/${item.original_title}`} className="title-wrapper">
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
												))}
											</Swiper>
										</div>
									)}
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