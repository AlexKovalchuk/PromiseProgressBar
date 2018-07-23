/**
 * Created by alex on 7/23/18.
 */
import React, {Component} from 'react';
import './PromiseProgressBar.css';
import helper from '../../helpers/PromiseProgressBar';

class PromiseProgressBar extends Component {
    render() {
        helper.progressBar();
        return(
            <div>
                here will be my progress bar
            </div>
        )
    }
}

export default PromiseProgressBar;
