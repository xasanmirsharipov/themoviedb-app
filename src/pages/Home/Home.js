import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {

	render(){

		return (
			<>
				<div>Home page</div>
				<div>
					<Link to="/news">News Page</Link>
				</div>
			</>
		);
	}

}

export default Home;