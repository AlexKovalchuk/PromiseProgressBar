import React, {Component} from 'react';
import {connect} from 'react-redux';
import './SideMenu.styl';
import {Link} from 'react-router-dom';

class SideMenu extends Component {


    render() {
        const pathParts = window.location.pathname.split('/');
        let menuActiveIndex = 0;
        if (this.props.categoriesData.length === 0) {
            return null
        }
        const menuItem = this.props.categoriesData.map((item, index) => {
            if (pathParts[2] === item.slug) {
                menuActiveIndex = index;
            }
            return (
                <Link to={item.path} key={`${index}-${item.slug}`}>
                    <li className={pathParts[2] === item.slug ? 'menu-item active' : 'menu-item'} onClick={() => {
                    }}>
                        <img src={item.url} alt=""/>
                        <p className={'menuSectionText'}>{item.title}</p>
                    </li>
                </Link>
            )
        });

        const subItem = this.props.categoriesData[menuActiveIndex].items.map((item, index) => {
            return (
                <li className={pathParts[3] === item.slug ? 'sub-menu-item active' : 'sub-menu-item'}
                    key={`${index}-${item.slug}`} onClick={() => {
                }}>
                    <Link to={item.path}><p className={'menu-sub-section-text'}>{item.title}</p></Link>
                    {item.items
                        ?
                        <ul className="sub-x2-menu-items">
                            {item.items.map((subItem, index) => {
                                return (

                                    <li className={pathParts[4] === subItem.slug ? 'sub-x2-menu-item active' : 'sub-x2-menu-item'}
                                        key={`${index}-${subItem.slug}`} onClick={() => {
                                    }}>
                                        <Link to={subItem.path}><p className="sub-x2-menu-text">{subItem.title}</p>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        :
                        null
                    }
                </li>
            )
        });

        return (
            <div className={'side-menu'}>
                <div className="menu-wrapper">
                    <ul className="menu">
                        {menuItem}
                    </ul>
                </div>
                <div className="sub-menu-wrapper">
                    <ul className="sub-menu">
                        {subItem}
                    </ul>
                </div>

            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        categoriesData: store.main.menu
    };
};

export default connect(mapStateToProps)(SideMenu);

