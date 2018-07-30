/**
 * Created by alex on 7/23/18.
 */
import React, {Component} from 'react';
import './PromiseProgressBar.css';
import helper from '../../helpers/PromiseProgressBar';
import promiseHelper from '../../helpers/PromiseArray';

class PromiseProgressBar extends Component {
    render() {
        helper.progressBar();
        console.log('promise array', promiseHelper.promiseArray);
        return(
            <div>
                here will be my progress bar
                <h1>We have {promiseHelper.promiseArray.length} processes.</h1>
            </div>
        )
    }
}

export default PromiseProgressBar;
