import {
    GeneralTypes
} from '../ActionTypes/GeneralActionTypes';

class GeneralActions {
    static ShowLoading = () => {
        return {
            type: GeneralTypes.SET_LOADING,
            payload: true,
        };
    };
    static HideLoading = () => {
        return {
            type: GeneralTypes.SET_LOADING,
            payload: false,
        };
    };
    static SetDashboardData = payload => {
        return {
            type: GeneralTypes.SET_DASHBOARD_DATA,
            payload: payload,
        };
    };
    static GetAllBrands = payload => {
        return {
            type: GeneralTypes.GET_ALL_BRANDS,
            payload: payload,
        };
    };
    static GetMoreBrands = payload => {
        return {
            type: GeneralTypes.GET_MORE_BRANDS,
            payload: payload,
        };
    };
    static GetAllCategories = payload => {
        return {
            type: GeneralTypes.GET_ALL_CATEGORIES,
            payload: payload,
        };
    };
    static GetTopCategories = payload => {
        return {
            type: GeneralTypes.GET_TOP_CATEGORIES,
            payload: payload,
        };
    };
    static GetMoreCategories = payload => {
        return {
            type: GeneralTypes.GET_MORE_CATEGORIES,
            payload: payload,
        };
    };
}

export default GeneralActions;
