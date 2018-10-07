import React,{Component} from 'react';
import './SliderPage.styl';
import BottomSection from './BottomSection/BottomSection';
import SliderBig from './SliderBig/SliderBig';

class SliderPage extends Component {

    render() {
        return(
            <section className='sliderPage__wrapper'>
                <SliderBig />

                <BottomSection />
            </section>
        )
    }
}

export default SliderPage;
