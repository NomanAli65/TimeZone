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
    static GetMoreAllProducts = (payload) => {
        return {
            type: ProductTypes.GET_MORE_ALL_PRODUCTS,
            payload
        };
    };
    static GetWishlist = payload => {
        return {
            type: ProductTypes.GET_WISHLIST,
            payload: payload,
        };
    };
    static GetMoreWishlist = payload => {
        return {
            type: ProductTypes.GET_MORE_WISHLIST,
            payload: payload,
        };
    };
    static AddRemToWishlist = payload => {
        return {
            type: ProductTypes.ADD_PRODUCT_WISHLIST,
            payload: payload,
        };
    };
    static ResetProducts = () => {
        return {
            type: ProductTypes.RESET_ALL_PRODUCTS,
        };
    };
    static ResetWishlist = () => {
        return {
            type: ProductTypes.RESET_GET_WISHLIST,
        };
    };
}

export default ProductActions;
