import React, {Component} from 'react';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class LoadMovieCredits extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    educationPlans: educationPlanSelectors.getAll(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        LoadEducationPlans: educationPlanActions.LoadAll
    },
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps)(LoadMovieCredits);