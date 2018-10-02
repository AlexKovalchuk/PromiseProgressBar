import React, {Component} from 'react';
import './ElephantWrapper.styl';

class ElephantWrapper extends Component {

    render() {
        return (
            <div className="elephant-wrapper">
                <div className='elephant-wrapper-scroll'>
                    <img className="elephant-image-background-light" src={require('../../images/main-page/light.png')}/>
                    <img className="elephant-image-background-slon-big" src={require('../../images/main-page/slon-big.png')}/>
                    <div className="elephant-content">
                        {this.props.children}
                    </div>
                </div>

            </div>

        );
    }
}

// ElephantWrapper.propTypes = {
//     date: PropTypes.object,
//     done: PropTypes.func
// };
//
// ElephantWrapper.defaultProps = {
//     date: new Date(),
//     done: () => {}
// };

export default ElephantWrapper;