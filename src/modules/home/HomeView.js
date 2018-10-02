import React, {Component} from 'react';
import './HomeView.styl'
import CountDown from '../../component/countDown/CountDown'
import Button from '@material-ui/core/Button';
import {history} from "../../redux/store";
import {connect} from 'react-redux';
import ElephantWrapper from '../../component/elephantWrapper/ElephantWrapper';

class HomeView extends Component {
    state = {
            update: 0
        };

    render() {
        const {defaultPath, startDate} = this.props;
        const timerTitle = 'До кінця голосування залишилось:';
        const date = new Date(startDate);
        let showNormalContend = date.getTime() - new Date().getTime() > 0;

        return (
            <div className="home-page-elephant-wrapper" id="home-page-elephant-wrapper">
                <ElephantWrapper>
                    <div className="home-page-content-wrapper">
                        {showNormalContend ? <div className="home-page-content">
                                <div className="timer-wrapper">
                                    <div className="timer-title">{timerTitle}</div>
                                    <div className="timer-counter">
                                        <CountDown
                                            done={()=>{this.setState({update: 1})}}
                                            date={date}/>
                                    </div>
                                </div>
                                <div className="promo-text-title">
                                    КОМУ ДАТИ СЛОНА <br/>
                                    ВИРІШУЄТЕ ВИ
                                </div>
                                <div className="offers-icon-block-wrapper">
                                    <div className="offer-icon-block">
                                        <img src={require('../../images/main-page/check-icon.svg')} alt="check-icon"/>
                                        <div>
                                            Голосуйте за улюбленні <br/> товари
                                        </div>
                                    </div>
                                    <div className="offer-icon-block">
                                        <img src={require('../../images/main-page/hand-icon.svg')} alt="check-icon"/>
                                        <div>
                                            Отримайте знижку або бали від <br/>
                                            Власного Рахунку
                                        </div>
                                    </div>
                                </div>
                                <div className="vote-button-wrapper">
                                    <Button variant="contained" className="vote-button"
                                            onClick={() => history.push(defaultPath || '/vote')}>
                                        ГОЛОСУВАТИ
                                    </Button>
                                </div>
                            </div>
                            :
                            <div className="home-page-content-alternative" id='home-page-content-alternative'>
                                <div className="promo-text-title">ГОЛОСУВАННЯ <br/> ЗАВЕРШЕНО</div>
                                <div className="thank-you-text">ДЯКУЄМО ЗА ВАШ ВИБІР</div>
                            </div>}
                    </div>
                </ElephantWrapper>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        defaultPath: store.main.defaultPath,
        startDate: store.main.startDate,
        expDate: store.main.expDate,
    };
};

export default connect(mapStateToProps)(HomeView);