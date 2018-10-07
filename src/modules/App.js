import React, {Component} from 'react';
import './App.styl'
import TopMenu from '../components/TopMenu/TopMenu';
import SliderPage from '../components/SliderPage/SliderPage';

class App extends Component {

    render() {
        return (
            <div className="App">
                <TopMenu />
                <SliderPage />
            </div>
        );
    }
}

export default App;

