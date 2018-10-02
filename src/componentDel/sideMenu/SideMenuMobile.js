import React, {Component} from 'react';
import './SideMenuMobile.styl';
import {Link} from 'react-router-dom';

class SideMenuMobile extends Component {
    /***
     * Render product list
     * @param list
     * @returns {*}
     */
    renderList = (list) => {
        const pathParts = window.location.pathname.split('/');
        let menuActiveIndex = 0;
        return list.map((item, index) => {
            if (pathParts[2] === item.slug) {
                menuActiveIndex = index;
            }
            return (

                <li className={pathParts[2] === item.slug ? 'menu-item active' : 'menu-item'}  key={`${index}-${item.slug}`}>
                    <Link to={item.path} >
                        <div className="menu-item-container">
                            <img className="menu-section-img" src={item.url} alt=""/>
                            <p className="menu-section-text">{item.title}</p>
                            <img className="arrow" src={require('../../images/side-menu/arrow.svg')} alt=""/>
                        </div>
                    </Link>
                    <ul className="sub-menu">
                        {list[menuActiveIndex].items.map((item, index) => {
                            let showMenu = ()=>{return null};
                            if(item.items.length === 0){
                                showMenu = this.props.closeMenu;
                            }
                            return (
                                <li className={pathParts[3] === item.slug ? 'sub-menu-item active' : 'sub-menu-item'}
                                    onClick={showMenu}
                                    key={`${index}-${item.slug}`} >
                                    {item.items.length > 0
                                        ?
                                         <div>
                                             <Link to={item.path}><p className={'menu-sub-section-text'}>{item.title}</p><img className="sub-arrow" src={require('../../images/side-menu/arrow.svg')} alt=""/></Link>
                                             <ul className="sub-x2-menu-items">
                                                {item.items.map((subItem, index) => {
                                                    return (

                                                        <li className={pathParts[4] === subItem.slug ? 'sub-x2-menu-item active' : 'sub-x2-menu-item'}
                                                            onClick={this.props.closeMenu}
                                                            key={`${index}-${subItem.slug}`} >
                                                            <Link to={subItem.path}><p className="sub-x2-menu-text">{subItem.title}</p>
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        :
                                        <Link to={item.path}><p className={'menu-sub-section-text'}>{item.title}</p></Link>
                                    }
                                </li>
                            )
                        })
                        }
                    </ul>
                </li>
            )
        });


    };

    render() {
        if (this.props.items.length === 0) {
            return null;
        }

        return (
            <div className={'side-menu'}>
                <ul className="menu">
                    {this.renderList(this.props.items)}
                </ul>
            </div>
        );
    }
}

export default SideMenuMobile;
