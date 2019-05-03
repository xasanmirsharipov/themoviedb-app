import React from 'react';

const ScrollTop = (Component) => {

    class HOComponent extends React.Component {

        componentDidMount() {
            // document.querySelector('.wrapper').scrollTop = 0;
            window.scrollTo(0, 0);
        }

        componentDidUpdate() {
            // document.querySelector('.wrapper').scrollTop = 0;
            window.scrollTo(0, 0);
        }

        render() {
            return <Component { ...this.props } />
        }
    }

    return HOComponent;
};

export default ScrollTop;