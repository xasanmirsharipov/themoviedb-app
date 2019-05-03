import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

// import Actions from "store/actions";
// import Selectors from "store/selectors";

import Actions from "../actions";
import Selectors from "../selectors";

export class One extends Component {

    componentDidMount(){
        const { entity, id, name, url } = this.props;
        this.Load( entity, id, name, url );
    }

    componentDidUpdate(prevProps){
        const { entity, id, name, url } = this.props;
        if(!isEqual(id, prevProps.id) || !isEqual(url, prevProps.url)){
            this.Load(entity, id, name, url);
        }
    }

    Load = (entity, id, name, url) => {
        const { LoadOne } = this.props;
        LoadOne({ entity, id, name, url });
    };

    render(){

        const { item, isFetched, children } = this.props;

        return children({ item, isFetched });
    }
}

const mapStateToProps = () => {

    const getOne = Selectors.getOne();

    return (state, props) => {

        const { item, isFetched } = getOne(state, props);

        return ({ item, isFetched })
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        LoadOne: Actions.LoadOne.request
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(One);
