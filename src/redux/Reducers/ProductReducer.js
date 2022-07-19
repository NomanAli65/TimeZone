import React from "react";

import { ProductTypes } from '../ActionTypes/ProductTypes';

let initialSate = {
    data: {
        data: []
    },
    wishlist: {
        data: []
    },

};

const ProductReducer = (state = initialSate, action) => {
    switch (action.type) {
        case ProductTypes.GET_ALL_PRODUCTS:
            state = { ...state, data: { ...state.data, data: [...state.data?.data, ...action.payload.data] } };
            break;
        case ProductTypes.RESET_ALL_PRODUCTS:
            state = { ...state, data: { data: [] } };
            break;
        case ProductTypes.RESET_GET_WISHLIST:
            state = { ...state, wishlist: { data: [] } };
            break;
        case ProductTypes.GET_WISHLIST:
            state = { ...state, wishlist: { ...state.wishlist, data: [...state.wishlist?.data, ...action.payload.data] } };
            break;
        case ProductTypes.ADD_PRODUCT_WISHLIST:
            let index = state.wishlist.data.findIndex((value) => value.product_id == action.payload.product_id);
            if (index == -1)
                state = { ...state, wishlist: { ...state.wishlist, data: [action.payload, ...state.wishlist?.data] } }
            else {
                let wish_copy = [...state.wishlist.data];
                wish_copy.splice(index, 1);
                state = { ...state, wishlist: { ...state.wishlist, data: wish_copy } };
            }
            break;
        default:
            break;
    }
    return state;
};

export default ProductReducer;