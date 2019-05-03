import React, {Component, Fragment} from 'react';

import EntityContainer from "modules/entity/containers";
import FullWidthSlider from "components/FullWidthSlider";

import Swiper from "react-id-swiper";
import {Navigation} from "swiper/dist/js/swiper.esm";


class TopSlider extends Component {

    render() {

        const params = {
            slidesPerView: 1,
            centeredSlides: true,
            effect: 'slide',
            modules: [Navigation],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
        };

        return (
            <div className="slider_v1 popular-slider">
                <div className="container">

                    <EntityContainer.All entity="movie" name="TrendingMovies" meta={{ page: 1 }} url={`/trending/all/day`}>
                        {({items, isFetched}) => (
                            <Fragment>
                                {isFetched && (
                                    <Swiper {...params}>
                                        {items.slice(0, 10).map(item => (
                                            <div key={item.id}>
                                                <FullWidthSlider item={item}/>
                                            </div>
                                        ))}
                                    </Swiper>
                                )}
                            </Fragment>
                        )}
                    </EntityContainer.All>

                </div>
            </div>
        );
    }
}

export default TopSlider;