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
    getAllBrands: ({next_url}) => {
        return async dispatch => {
            try {
                dispatch(GeneralActions.ShowLoading());
                let request = await get(next_url);
                if (request) {
                    dispatch(GeneralActions.GetAllBrands(request));
                }
                dispatch(GeneralActions.HideLoading());
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
    getAllCategories: ({next_url}) => {
        return async dispatch => {
            try {
                dispatch(GeneralActions.ShowLoading());
                let request = await get(next_url);
                if (request) {
                    dispatch(GeneralActions.GetAllCategories(request));
                }
                dispatch(GeneralActions.HideLoading());
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
};
