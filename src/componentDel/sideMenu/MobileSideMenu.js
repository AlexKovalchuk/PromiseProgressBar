import React, {Component} from 'react';
import './MobileSideMenu.styl';
import {history} from '../../redux/store';
import {connect} from 'react-redux';
import mainActions from "../../actions/mainActions";
import SideMenuMobile from '../../component/sideMenu/SideMenuMobile';
import {replace} from "react-router-redux";
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class MobileSideMenu extends Component {

    render() {
        const {logout, barcode, mobileMenu, closeMenu, defaultPath} = this.props;
        if (!mobileMenu.isMenuShow) return null;

        return (
            <div className={'mobile-side-menu-wrapper'}>
                <div className={'mobile-side-menu'}>
                    <div className={'elephant-block'}>
                        <img onClick={() => {history.push('/'); closeMenu()}} src={require('../../images/top-menu/elephantSilpo.svg')}
                             alt="elephant"/>
                    </div>
                    <div className={'links-block'} onClick={() => closeMenu()}>
                        <Link to={'/about'} className="links-block-item"><span>Про проект</span></Link>
                        <Link to={'/rules'} className="links-block-item"><span>Правила</span></Link>
                        <Link to={'/faq'} className="links-block-item"><span>Faq</span></Link>
                        <Link to={defaultPath || '/vote'} className="links-block-item"><span>Голосувати</span></Link>
                        <Link to={barcode? '/selected' : '/login'} className="links-block-item"><span>Мій вибір</span></Link>
                        {barcode?
                            <div className="links-block-item" onClick={logout}>
                                <span>Вийти</span>
                            </div> :
                            <Link to={'/login'} className="links-block-item"><span>Увійти</span></Link>
                        }
                    </div>
                    <div>
                        <SideMenuMobile items={this.props.items} closeMenu = {closeMenu}/>
                    </div>
                    <svg onClick={() => closeMenu()} className='close-menu' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" enableBackground="new 0 0 18 18" xmlSpace="preserve"><path fillRule="evenodd" clipRule="evenodd" d="M18,16.6L16.6,18L9,10.4L1.4,18L0,16.6L7.6,9L0,1.4L1.4,0L9,7.6L16.6,0L18,1.4 L10.4,9L18,16.6z"></path></svg>
                </div>
                <div className={'close-menu-block'} onClick={() => closeMenu()}/>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        mobileMenu: store.mobileMenu,
        items: store.main.menu,
        barcode: store.main.barcode,
        defaultPath: store.main.defaultPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeMenu: () => dispatch(mainActions.mobileMenuButtonClick()),
        logout: () => {
            dispatch(mainActions.logout());
            dispatch(replace('/'));
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, )(MobileSideMenu));