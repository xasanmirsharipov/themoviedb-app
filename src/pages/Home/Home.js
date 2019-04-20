import React, {Component, Fragment} from "react";

import MovieContainer from "modules/movie/containers";
import config from "config";
import {Link} from "react-router-dom";
import {genres} from 'services';
import Swiper from 'react-id-swiper';
import { Navigation } from 'swiper/dist/js/swiper.esm'

class Home extends Component {

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
			<>
				<div className="slider_v1 popular-slider">
					<div className="container">

						<MovieContainer.All name="PopularMovies" meta={{ page: 1 }} url={`/trending/all/day`}>
                            {({items, isFetched}) => (
                                <Fragment>
									{isFetched && (
										<div>
											<Swiper {...params}>
												{items.slice(0, 10).map(item => (
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
                        </MovieContainer.All>

					</div>
                </div>

                <div className="movies-list">
                    <div className="container">
                        <div className="title-hd">
                            <h2>movies</h2>
                            <a href="#" className="view-all">View all</a>
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

						<MovieContainer.All name="NowPlaying" url={`/movie/${this.state.activeTabLink.slug}`} meta={{ page: 1 }} options={{slug: this.state.activeTabLink.slug}}>
							{({items, isFetched}) => (
								<Fragment>
									{isFetched ? (
										<div className="row-wrapper col-6">
											{items.slice(0,18).map(movie => (
												<div key={movie.id} className="col-item movie-card mb-30">
													<img src={`${config.API_IMAGE.medium}/${movie.poster_path}`} alt=""/>
													<div className="movie-content">
														<div className="movie-title">{movie.original_title}</div>
														<div className="vote-average">{movie.vote_average}</div>
													</div>
													<Link to={`/movie/${movie.id}`} className="read-more"><span>watch</span></Link>
												</div>
											))}
										</div>
									) : (
										<div className="row-wrapper col-6">
											{[...Array(18)].map((item, i) => (
												<div key={i} className="col-item movie-card default-movie-card mb-30">
													<div className="default-mask"/>
												</div>
											))}
										</div>
									)}
								</Fragment>
							)}
						</MovieContainer.All>

					</div>
                </div>
			</>
		);
	}

}

export default Home;