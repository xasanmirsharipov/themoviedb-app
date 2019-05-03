import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import Actions from "../actions";
import Selectors from "../selectors";

export class All extends Component {

	componentDidMount(){
		const { entity, name, url, options, params, appendIds  } = this.props;
		this.Load(entity, name, url, options, params, appendIds );
	}

	componentDidUpdate(prevProps){
		const { entity, name, url, options, params, appendIds } = this.props;
		if(!isEqual(options, prevProps.options) || !isEqual(params, prevProps.params)){
			this.Load(entity, name, url, options, params, appendIds);
		}
	}

	Load = (entity, name, url, options, { page = 1, limit = 3, sort = "-id", fields = [], include = [], filter = [] } = {}, appendIds = false) => {
		const { LoadAll } = this.props;
		LoadAll({
			entity,
			name,
			url,
			options,
			params: { page, limit, sort, fields, include, filter },
            appendIds
		});
	};

	render(){

		const { items, isFetched, meta, children } = this.props;

		return children({ items, meta, isFetched });
	}
}

const mapStateToProps = () => {

	const getAll = Selectors.getAll();

	return (state, props) => {

		const { items, isFetched, meta } = getAll(state, props);

		return ({ items, isFetched, meta })
	}
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadAll: Actions.LoadAll.request
	},
	dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(All);