import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import Actions from "store/actions";
import Selectors from "store/selectors";

class Popular extends Component {

    componentDidMount(){
        const { name, url, options, meta } = this.props;
        this.Load(name, url, options, meta);
    }

    componentDidUpdate(prevProps){
        const { name, url, options, meta } = this.props;
        if(!isEqual(options, prevProps.options) || !isEqual(meta, prevProps.meta)){
            this.Load(name, url, options, meta);
        }
    }

    Load = (name, url, options, { page = 1, limit = 3, sort = "-id", fields = [], include = [], filter = [] } = {}) => {
        const { LoadAll } = this.props;
        LoadAll({
            name,
            url,
            options,
            meta: { page, limit, sort, fields, include, filter },
            cb: {
                success: () => {},
                error: () => {},
            }
        });
    };

    render(){

        const { items, isFetched, meta, children } = this.props;

        return children({ items, meta, isFetched });
    }
}

const mapStateToProps = () => {

    const getAll = Selectors.movie.getAll();

    return (state, props) => {

        const { items, isFetched, meta } = getAll(state, props);

        return ({ items, isFetched, meta })
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        LoadAll: Actions.movie.LoadAll.request
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Popular);