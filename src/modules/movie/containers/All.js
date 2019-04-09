import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import Actions from "store/actions";
import Selectors from "store/selectors";

class All extends Component {

	componentDidMount(){
		const { name, data, meta } = this.props;
		this.Load(name, data, meta);
	}

	componentDidUpdate(prevProps){
		const { name, data, meta } = this.props;
		if(!isEqual(data, prevProps.data) || !isEqual(meta, prevProps.meta)){
			this.Load(name, data, meta);
		}
	}

	Load = (name, { id, groupId }, { page = 1, limit = 10, sort = "-id", fields = [], include = [], filter = [] } = {}) => {
		const { LoadAll } = this.props;
		LoadAll({
			name,
			data: { id },
			meta: { page, limit, sort, fields, include, filter },
			cb: {
				success: () => {},
				error: () => {},
			}
		});
	};

	// filter: {
	// 	type: {
	// 		child: 1
	// 	}
	// }

	// filter[type][child]=1

	render(){

		const { items, isFetched, meta, children } = this.props;

		return children({ items, meta, isFetched });
	}
}

const mapStateToProps = () => {

	const getAllMovies = Selectors.movie.getAll();

	return (state, props) => {

		const { items, isFetched, meta } = getAllMovies(state, props);

		return ({ items, isFetched, meta })
	}
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadAll: Actions.movie.LoadAll.request
	},
	dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(All);