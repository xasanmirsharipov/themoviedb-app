import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import Actions from "store/actions";
import Selectors from "store/selectors";

class Popular extends Component {

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

    Load = (name, {}, { page = 1, limit = 3, sort = "-id", fields = [], include = [], filter = [] } = {}) => {
        const { LoadPopular } = this.props;
        LoadPopular({
            name,
            data: { },
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

    const getPopular = Selectors.movie.getPopular();

    return (state, props) => {

        const { items, isFetched, meta } = getPopular(state, props);

        return ({ items, isFetched, meta })
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        LoadPopular: Actions.movie.LoadPopular.request
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Popular);