import React,{Component} from 'react';
import './SliderPage.styl';
import BottomSection from './BottomSection/BottomSection';
import SliderBig from './SliderBig/SliderBig';
import SliderSmall from './SliderSmall/SliderSmall';

class SliderPage extends Component {

    render() {
        return(
            <section className='sliderPage__wrapper'>
                <SliderBig />
                <SliderSmall />
                <BottomSection />
            </section>
        )
    }
}

export default SliderPage;
