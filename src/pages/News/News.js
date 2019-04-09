import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Actions from "store/actions";

class News extends Component {

	componentDidMount(){
		this.props.LoadAll();
	}

	logout = () => {
		this.props.Reset();
	};

	render(){

		return (
			<>
				<div>News page</div>
				<div>
					<Link to="/">Home Page</Link>
					<div>
						<button onClick={this.logout}>logout</button>
					</div>
				</div>
			</>
		);
	}

}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadAll: Actions.news.LoadAll.trigger,
		Reset: Actions.news.Reset.trigger,
	},
	dispatch
);

export default connect(null, mapDispatchToProps)(News);