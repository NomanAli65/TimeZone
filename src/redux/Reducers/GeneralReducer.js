import React from "react";

import { GeneralTypes } from '../ActionTypes/GeneralActionTypes';

let initialSate = {
    loading: false,
    dashboardData: null,
    all_brands: null,
    all_categories: null,
    top_categories: null,
    refresh_dash: true
};

const GeneralReducer = (state = initialSate, action) => {
    switch (action.type) {
        case GeneralTypes.SET_DASHBOARD_DATA:
            state = { ...state, dashboardData: action.payload, loading: false };
            break;
        case GeneralTypes.REFRESH_DASHBOARD:
            console.warn("reducer",action.payload)
            state = { ...state, refresh_dash: action.payload };
            break;
        case GeneralTypes.SET_LOADING:
            state = { ...state, loading: action.payload };
            break;
        case GeneralTypes.GET_ALL_BRANDS:
            state = { ...state, all_brands: action.payload };
            break;
        case GeneralTypes.GET_MORE_BRANDS:
            state = { ...state, all_brands: { ...action.payload, data: [...state.all_brands.data, ...action.payload.data] } };
            break;
        case GeneralTypes.GET_TOP_CATEGORIES:
            state = { ...state, top_categories: action.payload };
            break;
        case GeneralTypes.GET_ALL_CATEGORIES:
            state = { ...state, all_categories: action.payload };
            break;
        case GeneralTypes.GET_MORE_CATEGORIES:
            state = { ...state, all_categories: { ...action.payload, data: [...state.all_categories.data, ...action.payload.data] } };
            break;
        default:
            break;
    }
    return state;
};

export default GeneralReducer;
