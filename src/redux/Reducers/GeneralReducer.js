import React from "react";

import { GeneralTypes } from '../ActionTypes/GeneralActionTypes';

let initialSate = {
    loading: false,
    dashboardData: null,
    all_brands: null,
    all_categories: null
};

const GeneralReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GeneralTypes.SET_DASHBOARD_DATA:
            state = { ...state, dashboardData: action.payload, loading: false };
            break;
        case GeneralTypes.SET_LOADING:
            state = { ...state, loading: action.payload };
            break;
        case GeneralTypes.GET_ALL_BRANDS:
            state = { ...state, all_brands: { ...action.payload, data: [...state.all_brands.data, ...action.payload.data] } };
            break;
        case GeneralTypes.GET_ALL_CATEGORIES:
            state = { ...state, all_categories: { ...action.payload, data: [...state.all_categories.data, ...action.payload.data] } };
            break;
        default:
            break;
    }
    return state;
};

export default GeneralReducer;
