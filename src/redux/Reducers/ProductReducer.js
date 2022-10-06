import React from "react";

import { ProductTypes } from '../ActionTypes/ProductTypes';

let initialSate = {
    data: {
        data: []
    },
    wishlist: {
        data: []
    },
    cart: [],
    orders: {
        data: []
    }
};

const ProductReducer = (state = initialSate, action) => {
    switch (action.type) {
        case ProductTypes.GET_ALL_PRODUCTS:
            state = { ...state, data: action.payload };
            break;
        case ProductTypes.GET_MORE_PRODUCTS:
            state = { ...state, data: { ...action.payload, data: [...state.data?.data, ...action.payload.data] } };
            break;
        case ProductTypes.GET_ORDERS:
            state = { ...state, orders: action.payload };
            break;
        case ProductTypes.GET_MORE_ORDERS:
            state = { ...state, orders: { ...action.payload, data: [...state.orders?.data, ...action.payload.data] } };
            break;
        case ProductTypes.GET_WISHLIST:
            state = { ...state, wishlist: action.payload.wishlist };
            break;
        case ProductTypes.GET_MORE_WISHLIST:
            state = { ...state, wishlist: { ...action.payload, data: [...state.wishlist?.data, ...action.payload.data] } };
            break;
        case ProductTypes.ADD_PRODUCT_WISHLIST:
            if (state.wishlist?.data?.length > 0) {
                let index = state.wishlist.data.findIndex((value) => value.product_id == action.payload.product_id);
                if (index > -1) {
                    let wish_copy = [...state.wishlist.data];
                    wish_copy.splice(index, 1);
                    state = { ...state, wishlist: { ...state.wishlist, data: wish_copy } };
                }
                else {
                    let wish_copy = [...state.wishlist.data, action.payload];
                    state = { ...state, wishlist: { ...state.wishlist, data: wish_copy } };
                }
            }
            else {
                let wish_copy = [...state.wishlist.data, action.payload];
                state = { ...state, wishlist: { ...state.wishlist, data: wish_copy } };
            }
            break;
        case ProductTypes.ADD_TO_CART:
            state = { ...state, cart: [...state.cart, action.payload] };
            break;
        case ProductTypes.REMOVE_FROM_CART:
            let index = state.cart.findIndex((value) => value.id == action.payload.id);
            let cart_copy = [...state.cart];
            cart_copy.splice(index, 1);
            state = { ...state, cart: cart_copy };
            break;
        case ProductTypes.EMPTY_CART:
            state = { ...state, cart: [] };
            break;
        default:
            break;
    }
    return state;
};

export default ProductReducer;
