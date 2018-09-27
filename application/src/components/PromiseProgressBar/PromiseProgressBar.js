/**
 * Created by alex on 7/23/18.
 */
import React, {Component} from 'react';
import './PromiseProgressBar.css';
import promiseIndicator from '../../helpers/PromiseProgressBar';
import promiseArray from '../../helpers/PromiseArray';
// import generators from '../../helpers/GeneratorLib';

class PromiseProgressBar extends Component {
    constructor(props){
        super(props);
        this.state={
            promiseIndicator: new promiseIndicator(this.rollBack),
            data: {
                tasksCount: 0,
                tasksDone: 0,
                percentDone: 0,
                timeSpend: 0,
                sma: 0,
            }
        }
    }

    rollBack = data => {
        // console.log('data', data);
        this.setState({data});
    };

    componentDidMount(){
        this.state.promiseIndicator.resolvePromises(promiseArray);
        // let cycle = generators.cycle([10,11,12,13,-24,5,6,7,8,-9,10,11,-12,13,14,15]);
        // for(let i=0; i < 12; i++) {
        //     console.log('Component', cycle.next());
        // }
    }

    render() {
        return(
            <div>
                here will be my progress bar
                <h1>We have {this.state.data.tasksCount} processes.</h1>
                <div>
                    <h3>done processes {this.state.data.tasksDone}</h3>
                    <h3>done in percentage {this.state.data.percentDone}%</h3>
                    <h3>time spent {this.state.data.timeSpend} seconds</h3>
                    <h3>sma time {this.state.data.sma} seconds</h3>
                </div>
            </div>
        )
    }
}

export default PromiseProgressBar;
