import React, { Component } from "react";
import { Link } from "react-router-dom";

import MovieContainer from "modules/movie/containers";

class Home extends Component {

	render(){

		return (
			<>
				<div>Home page</div>
				<div>
					<Link to="/news">News</Link>
				</div>

				<MovieContainer.All name="AllMovies" data={{ category: 1 }} meta={{ page: 1, limit: 1 }}>
					{() => (
						<div>hello</div>
					)}
				</MovieContainer.All>

				<MovieContainer.All name="farruxsmovies" data={{ id: 1 }} meta={{ page: 1, limit: 10 }}>
					{() => (
						<div>hello</div>
					)}
				</MovieContainer.All>

			</>
		);
	}

}

export default Home;