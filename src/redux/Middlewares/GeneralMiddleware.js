/* eslint-disable prettier/prettier */
import { APIs } from '../../configs/APIs';
import { get, post } from '../../configs/AxiosConfig';
import { GeneralTypes } from '../ActionTypes/GeneralActionTypes';
import GeneralActions from '../Actions/GeneralActions';

export const GeneralMiddleware = {
    getDashboardData: () => {
        return async dispatch => {
            try {
                dispatch(GeneralActions.ShowLoading());
                let request = await get(APIs.Dashboard);
                if (request) {
                    dispatch(GeneralActions.SetDashboardData(request))
                }
                dispatch(GeneralActions.HideLoading());
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
    getAllBrands: ({ callback, search }) => {
        return async dispatch => {
            try {
                let request = await get(APIs.AllBrands + "/" + search);
                if (request) {
                    dispatch(GeneralActions.GetAllBrands(request));
                }
                callback();
            } catch (error) {
                callback();
                console.warn(error);
            }
        };
    },
    getAllCategories: ({ search, callback }) => {
        return async dispatch => {
            try {
                let request = await get(APIs.AllCategories + "/" + search);
                if (request) {
                    dispatch(GeneralActions.GetAllCategories(request));
                }
                callback()
            } catch (error) {
                callback()
                console.warn(error);
            }
        };
    },
    getTopCategories: ({ callback }) => {
        return async dispatch => {
            try {
                let request = await get(APIs.TopCategories);
                if (request) {
                    dispatch(GeneralActions.GetTopCategories(request));
                }
                callback()
            } catch (error) {
                callback()
                console.warn(error);
            }
        };
    },
};
