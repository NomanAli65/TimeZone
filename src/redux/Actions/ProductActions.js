import {
    ProductTypes
} from '../ActionTypes/ProductTypes';

class ProductActions {
    static GetAllProducts = (payload) => {
        return {
            type: ProductTypes.GET_ALL_PRODUCTS,
            payload
        };
    };
    static GetWishlist = payload => {
        return {
            type: ProductTypes.GET_WISHLIST,
            payload: payload,
        };
    };
}

export default ProductActions;
