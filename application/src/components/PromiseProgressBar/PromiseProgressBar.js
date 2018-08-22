/**
 * Created by alex on 7/23/18.
 */
import React, {Component} from 'react';
import './PromiseProgressBar.css';
import promiseIndicator from '../../helpers/PromiseProgressBar';
import promiseArray from '../../helpers/PromiseArray';

class PromiseProgressBar extends Component {
    render() {
        promiseIndicator(promiseArray);
        return(
            <div>
                here will be my progress bar
                <h1>We have {promiseArray.length} processes.</h1>
                <div>
                    done processes ????
                </div>
            </div>
        )
    }
}

export default PromiseProgressBar;
