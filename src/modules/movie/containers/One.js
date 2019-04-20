import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import Actions from "store/actions";
import Selectors from "store/selectors";

class One extends Component {

    constructor(props){
        super(props);
        this.state = {
            isFetched: false
        }
    }

    componentDidMount(){
        const { id, url } = this.props;
        this.Load( id, url );
    }

    componentDidUpdate(prevProps){
        const { id, url } = this.props;
        if(!isEqual(id, prevProps.id) || !isEqual(url, prevProps.url)){
            this.Load(id, url);
        }
    }

    Load = (id, url) => {
        const { LoadOne } = this.props;
        this.setState({
            isFetched: false
        });
        LoadOne({
            id,
            url,
            cb: {
                success: () => {
                    this.setState({
                        isFetched: true
                    })
                },
                error: () => {},
            }
        });
    };

    render(){
        const { isFetched } = this.state;
        const { item, children } = this.props;

        return children({ item, isFetched });
    }
}

const mapStateToProps = () => {

    const getOne = Selectors.movie.getOne();

    return (state, props) => {

        const { item } = getOne(state, props);

        return ({ item })
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        LoadOne: Actions.movie.LoadOne.request
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(One);