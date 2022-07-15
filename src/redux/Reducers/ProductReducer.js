import React from "react";

import { ProductTypes } from '../ActionTypes/ProductTypes';

let initialSate = {
    data: [],
    wishlist: [],

};

const ProductReducer = (state = initialSate, action) => {
    switch (action.type) {
        case ProductTypes.GET_ALL_PRODUCTS:
            state = { ...state, data: action.payload };
            break;
        case ProductTypes.GET_WISHLIST:
            state = { ...state, wishlist: action.payload };
            break;
        case ProductTypes.ADD_PRODUCT_WISHLIST:
            state = { ...state, wishlist: [...state.wishlist, action.payload] };
            break;
        case ProductTypes.REMOVE_PRODUCT_WISHLIST:
            let wish_copy = [...state.wishlist];
            wish_copy.splice(action.index, 1);
            state = { ...state, wishlist: wish_copy };
            break;
        default:
            break;
    }
    return state;
};

export default ProductReducer;
