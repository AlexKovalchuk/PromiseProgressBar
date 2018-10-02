export default {
    /***
     * Send request to vote about product
     * @param categoryId
     * @param goodsId
     * @param barcode
     * @param awardId
     * @returns {{type: string, params: {awardId: *, barcode: *, awardNominationId: *, awardGroupId: *}}}
     */
    updateProducts: (categoryId, goodsId, barcode, awardId) => {
        return {
            type: 'VOTE_GOODS',
            params: {
                awardId,
                barcode,
                awardNominationId: categoryId,
                awardGroupId: goodsId
            }
        }
    },
    /***
     * Update vote result in store
     * @param payload
     * @returns {{type: string, payload: *}}
     */
    resetProduct:(payload) => {
        return {
            type: 'VOTE_RESULTS_GOODS',
            payload: payload
        }
    },
    /***
     * Get products in category
     * @param categoryId
     * @param barcode
     * @param awardId
     * @returns {{type: string, params: {awardNominationId: *, awardId: *}}}
     */
    requestProducts: (categoryId, barcode, awardId) => {
        const request = {
            type: 'UPDATE_GOODS',
            params: {
                awardNominationId: categoryId,
                awardId
            }
        };
        if (barcode) {
            request.params.barcode = barcode;
        }
        return request;
    },
    /***
     * Make request for awards results
     * @param barcode
     * @param awardId
     * @returns {{type: string, params: {barcode: *, awardId: *}}}
     */
    awardResults: (barcode, awardId) => {
        return {
            type: 'VOTE_RESULTS',
            params: {barcode, awardId}
        }
    }
}