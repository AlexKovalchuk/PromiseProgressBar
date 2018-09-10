/**
 * Created by alex on 7/23/18.
 */
import React, {Component} from 'react';
import './PromiseProgressBar.css';
import promiseIndicator from '../../helpers/PromiseProgressBar';
import promiseArray from '../../helpers/PromiseArray';

const rollBack = data => {
    console.log('data', data);
};

class PromiseProgressBar extends Component {
    constructor(props){
        super(props);
        this.state={
            promiseIndicator: new promiseIndicator(rollBack)
        }
    }


    render() {
        this.state.promiseIndicator.resolvePromises(promiseArray);
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
