import React from 'react';
import qs from "query-string";

const ScrollTop = (Component) => {

    class HOComponent extends React.Component {

        componentDidMount() {
            // document.querySelector('.wrapper').scrollTop = 0;
            window.scrollTo(0, 0);
        }

        componentDidUpdate() {
            const { location } = this.props;
            const query = qs.parse(location.search);

            if(!query.page){
                window.scrollTo(0, 0);
            }
            // document.querySelector('.wrapper').scrollTop = 0;
        }

        render() {
            return <Component { ...this.props } />
        }
    }

    return HOComponent;
};

export default ScrollTop;