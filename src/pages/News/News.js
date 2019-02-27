import React, { Component } from 'react';
import { Link } from "react-router-dom";

class News extends Component {

	render(){

		return (
			<>
				<div>News page</div>
				<div>
					<Link to="/">Home Page</Link>
				</div>
			</>
		);
	}

}

export default News;