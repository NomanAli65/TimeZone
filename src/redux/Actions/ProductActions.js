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
    static AddToCart = (data) => {
        return {
            type: ProductTypes.ADD_TO_CART,
            payload: data
        };
    };
    static RemoveFromCart = (data) => {
        return {
            type: ProductTypes.REMOVE_FROM_CART,
            payload: data
        };
    };
    static EmptyCart = () => {
        return {
            type: ProductTypes.EMPTY_CART,
        };
    }
    static GetOrders = (data) => {
        return {
            type: ProductTypes.GET_ORDERS,
            payload: data
        };
    };
    static GetMoreOrders = (data) => {
        return {
            type: ProductTypes.GET_MORE_ORDERS,
            payload: data
        };
    };
}

export default ProductActions;
