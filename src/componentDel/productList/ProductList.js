import React, {Component} from 'react';
import './ProductList.styl';

class ProductList extends Component {
    /***
     * Render product list
     * @param list
     * @param updateProducts
     * @param isVoted
     * @returns {*}
     */
    renderProductList = (list, updateProducts, isVoted) => {
        return list.map((item, index) => {
            const place = item.place !== null? <div className={`place place-${item.place}`}/> : null;
            return (
                <li className="item" key={`item-${index}`}>
                    {
                        isVoted
                            ?
                            item.isVoted
                                ?
                                <div className="item-container noGlowing">
                                    <img className="item-img" src={item.url} alt=""/>
                                    {place}

                                    <p>{item.title}</p>
                                    <div className="button-voted">
                                        <p>Проголосували {item.voteResult}%</p>
                                        <div className="scale-voted">
                                            <div className="scale-percent" style={{width: item.voteResult + '%'}}/>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="item-container unActive">
                                    <img className="item-img" src={item.url} alt=""/>
                                    <p>{item.title}</p>
                                    <div className="button-vote">голосувати</div>
                                </div>
                            :
                            <div className="item-container">
                                <img className="item-img" src={item.url} alt=""/>
                                <p>{item.title}</p>
                                <div className="button-vote" onClick={() => {
                                    updateProducts(item.id)
                                }}>голосувати
                                </div>
                            </div>
                    }
                </li>
            )
        });
    };

    render() {
        const {items, title, description, updateProducts, isVoted} = this.props;
        if (!items || items.length === 0) {
            return null;
        }
        return (
            <div className="product-list-wrapper">
                <div className="product-list">
                    {
                        title ? <div className="product-list-title"><p>{title}</p></div> : null
                    }
                    <h3 className="product-list-description">{description}</h3>
                    <div className="product-list-holder">
                        <ul className="product-list">
                            {this.renderProductList(items, updateProducts, isVoted)}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

export default ProductList;
