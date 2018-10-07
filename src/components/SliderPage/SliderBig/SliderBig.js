/**
 * Created by alex on 10/7/18.
 */
import React, {Component} from 'react';
import './SliderBig.styl';

const BG_IMAGES = [
    '../../../images/Background/bg1.jpg',
    '../../../images/Background/bg2.jpg',
];


class SliderBig extends Component {
    render(){
        return(
            <div className="slider-big_wrapper">
                <img className="bg-img" src={BG_IMAGES[0]} alt=""/>
                <img className="bg-img" src={BG_IMAGES[1]} alt=""/>
            </div>
        )
    }
}

export default SliderBig;
