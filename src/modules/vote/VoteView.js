import React, {Component} from 'react';
import ProductList from '../../component/productList/ProductList';
import SideMenu from '../../component/sideMenu/SideMenu';
import {connect} from 'react-redux';
import updateProductList from '../../actions/updateProductList';
import {withRouter} from 'react-router-dom';
import {replace} from 'react-router-redux';
import './VoteView.styl';

class VoteView extends Component {
    /***
     * Vote one product by it id
     * @param goodsId
     */
    voteProduct = (goodsId) => {
        const {updateProducts, barcode, awardId, goods} = this.props;
        if (updateProducts) {
            updateProducts(goods.id, goodsId, barcode, awardId);
        }
    };

    render() {
        const {goods, goToLogin, barcode, apiError} = this.props;
        return (
            <div className={'vote-view'}>
                <SideMenu location={this.props.location.pathname}/>
                {
                    apiError === '' && goods.message === '' ?
                        <ProductList {...goods} updateProducts={barcode ? this.voteProduct : goToLogin}/>
                        : <div className="api-error-message"><p>{apiError}{goods.message}</p></div>
                }
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        goods: store.goods,
        awardId: store.main.awardId,
        barcode: store.main.barcode,
        apiError: store.main.message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateProducts: (categoryId, goodsId, barcode, awardId) =>
            dispatch(updateProductList.updateProducts(categoryId, goodsId, barcode, awardId)),
        goToLogin: () => dispatch(replace('/login#' + window.location.pathname))
    }

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VoteView))