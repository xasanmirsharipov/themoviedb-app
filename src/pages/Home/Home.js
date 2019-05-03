import React, {Component} from "react";

import {TopSlider, MoviesTab} from "./sections";

class Home extends Component {

	render(){
		return (
			<>
				<TopSlider/>
                <MoviesTab/>
			</>
		);
	}

}

export default Home;