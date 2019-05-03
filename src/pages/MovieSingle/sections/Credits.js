import React, {Component} from 'react';

import config from "config";
import EntityContainer from "modules/entity/containers";

import {withRouter} from "react-router";


class Credits extends Component {

    constructor(props){
        super(props);
        this.state = {
            showedItems: 12
        }
    }

    _showAll = () =>{
        let count = "";
        if(this.state.showedItems === 12){
           count = 100
        }else{
            count = 12
        }

        this.setState({
            showedItems: count
        })
    };


    render() {

        const {match} = this.props;
        const {showedItems} = this.state;

        return (
            <EntityContainer.One  entity="movie" name="Credits" url={`/movie/${match.params.id}/credits`} id={Number(match.params.id)}>
                {({item, isFetched}) => {
                    return(
                        <>
                            <div className="credits">
                                <div className="credits-title">Cast<span onClick={this._showAll}>Показать все</span></div>
                                <div className="credits-inline">
                                    {isFetched && item.cast.slice(0,showedItems).map((cast, i) => (
                                        <div className="credit-item" key={i}>
                                            {cast.profile_path ? (
                                                <div className="credit-img">
                                                    <img src={`${config.API_IMAGE.original}/${cast.profile_path}`} alt=""/>
                                                </div>
                                            ) : (
                                                <div className="credit-img no-photo">
                                                    <div className="img"/>
                                                </div>
                                            )}
                                            <div className="credit-content">
                                                <div className="credit-name">{cast.name}</div>
                                                <div className="credit-character">{cast.character}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {!isFetched && (
                                        <>
                                            {[...Array(6)].map((item, i) => (
                                                <div className="credit-item" key={i}>
                                                    <div className="credit-img no-photo">
                                                        <div className="img"/>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )
                }}
            </EntityContainer.One>
        );
    }
}

export default withRouter(Credits);