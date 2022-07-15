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
    static GetAllCategories = payload => {
        return {
            type: GeneralTypes.GET_ALL_CATEGORIES,
            payload: payload,
        };
    };
}

export default GeneralActions;
