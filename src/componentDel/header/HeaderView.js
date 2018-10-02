import React, {Component} from 'react';
import {history} from '../../redux/store';
import {replace} from "react-router-redux";
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './HeaderView.styl';
import mainActions from "../../actions/mainActions";
import {Link} from 'react-router-dom';

class HeaderView extends Component {
//todo: replace to react way. about selection
    choseSection = (e, route) => {
        const textBlockArray = document.getElementsByClassName('item-text');
        for (let i = 0; i < textBlockArray.length; i++) {
            textBlockArray[i].style.color = '#fff';
        }
        e.target.style.color = '#ee7501';
        history.push(route);
    };

    render() {
        const {logout, mobileMenuButtonClick, barcode, defaultPath} = this.props;

        return (
            <div className={'header-wrapper'}>

                <div className={'header-mobile'}>
                    <AppBar position="static" className={'app-bar-mobile'}>
                        <Toolbar className={'tool-bar-mobile'}>
                            <IconButton color="inherit" aria-label="Menu" onClick={() => mobileMenuButtonClick()}>
                                <MenuIcon/>
                            </IconButton>
                            <div onClick={() => history.push('/')} className={'topMenu-silpoElephant-mobile'}>
                                <img src={require('../../images/top-menu/elephantSilpo.svg')} alt="elephant"/>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>

                <div className='header'>
                    <AppBar position="static" className={'app-bar'}>
                        <Toolbar className={'tool-bar'}>
                            <div className='topMenu'>
                                <div
                                    onClick={e => this.choseSection(e, '/')}
                                    className={'topMenu-silpoElephant topMenu-item'}>
                                    <img src={require('../../images/top-menu/elephantSilpo.svg')} alt="elephant"/>
                                </div>
                                <div className={'topMenu-item'}>
                  <span className={'item-text'}
                        onClick={e => this.choseSection(e, defaultPath || '/vote')}>Голосувати</span>
                                </div>
                                <div

                                    className={'topMenu-item'}>
                  <span className={'item-text'}
                        onClick={e => this.choseSection(e, '/about')}>Проект «СЛОН» </span>
                                </div>
                                <div className={'topMenu-item'}>
                  <span className={'item-text'}
                        onClick={e => this.choseSection(e, '/rules')}>Якого «СЛОНА» обрати?</span>
                                </div>
                                <div className={'topMenu-item'}>
                  <span className={'item-text'}
                        onClick={e => this.choseSection(e, '/faq')}>Питання та відповіді </span>
                                </div>
                            </div>
                            <div className={'topMenu'}>
                                <div className={'topMenu-item'}>
                  <span className={'item-text'}
                        onClick={e => this.choseSection(e, barcode ? '/selected' : '/login')}>Мій вибір</span></div>

                                {barcode ?
                                    <div
                                        onClick={logout}
                                        className={'exit-icon-wrapper topMenu-item'}>
                                        <img className={'exit-icon'} src={require('../../images/top-menu/exit.svg')}
                                             alt="elephant"/>
                                    </div> :
                                    <Link
                                        to={'/login'}
                                        className={'exit-icon-wrapper topMenu-item'}>
                                        <img className={'exit-icon'} src={require('../../images/top-menu/people.svg')}
                                             alt="elephant"/>
                                    </Link>
                                }

                            </div>
                        </Toolbar>
                    </AppBar>
                </div>

            </div>
        );
    }
}


const mapStateToProps = store => {
    return {
        mobileMenu: store.mobileMenu,
        barcode: store.main.barcode,
        defaultPath: store.main.defaultPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        mobileMenuButtonClick: () => dispatch(mainActions.mobileMenuButtonClick()),
        logout: () => {
            dispatch(mainActions.logout());
            dispatch(replace('/'));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);
