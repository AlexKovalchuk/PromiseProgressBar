import React, { Component } from 'react';
import CountDown from '../../component/countDown/CountDown';
import './SelectedView.styl';
import {connect} from 'react-redux';

class SelectedView extends Component {
    state = {
        update: 0
    };

    splitDate = (expDate) => {
        const parts = expDate.split(/-|T/);
        return parts[2] + '.' + parts[1] + '.' + parts[0];
    };




    renderProductItem = (bonusType, value) => {
        switch(bonusType) {
            case 'percent':
            return (<div className="score">-{value}%</div>);

            case 'points':
            return (<div className="score">+<br/>{value}<br/><p className={'smaller-text'}>Балів</p></div>);

            case 'multiply':
            return (<div className="score"><div className='group1'><span>×</span>{value}</div><p className={'smaller-text'}>Балів</p></div>);

            case 'discount':
            return ( <div className="score">-{value}<br/><p className={'smaller-text'}>грн</p></div>);

            case 'promotionPrice':
            return (<div className="score"><p className={'smaller-text'}>за</p><div>{value}<p className={'smaller-text'}>грн</p></div></div>);

            default:
                return null
        }
    };

    renderProductList = (data) => {
        if (!data || data.lengh === 0) {
            return null;
        }
        return data.map((item, index) => {
            return (
                <li className="item" key={`item-${index}`}>
                    <div className={'item-container'}>
                        {this.renderProductItem(item.bonusType, item.bonus)}
                        <img src={item.url} alt=""/>
                        <p className={'title'}>{item.title}</p>
                        <p className="description">Знижка дійсна до {this.splitDate(item.expDate)}</p>
                    </div>
                </li>
            )})
    };

    render() {
        const {awardResults, startDate, apiError, expDate} = this.props;
        let timerTitle = 'До отримання винагороди залишилось:';
        let date = new Date(startDate);
        if(date < new Date()){
            date = new Date(expDate);
            timerTitle = "Винагорода закінчиться через:";
        }
        if (apiError) {
            return <div className="api-error-message"><p>{apiError}</p></div>
        }

    return (
        <div className='selected-view-wrapper'>
            <div className='selected-view'>
                <div className='top-content'>
                    <div className='timer-wrapper'>
                        <p className='title-text'>Мій вибір</p>
                        <div className='timer-title'>{timerTitle}</div>
                        <div className='timer-counter'>
                            <CountDown
                                done={()=>{this.setState({update: this.state.update + 1})}}
                                date={date}
                            />
                        </div>
                    </div>
                </div>
                <ul className="product-list">
                    {this.renderProductList(awardResults)}
                </ul>
            </div>
        </div>
    )
  }
}

const mapStateToProps = store => {
    return {
        awardResults: store.main.awardResults,
        startDate: store.main.startDate,
        expDate: store.main.expDate,
        apiError: store.main.message
    };
};

export default connect(mapStateToProps)(SelectedView);