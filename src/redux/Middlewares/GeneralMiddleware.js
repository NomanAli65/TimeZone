/* eslint-disable prettier/prettier */
import { APIs } from '../../configs/APIs';
import { get, post } from '../../configs/AxiosConfig';
import { GeneralTypes } from '../ActionTypes/GeneralActionTypes';
import GeneralActions from '../Actions/GeneralActions';

export const GeneralMiddleware = {
    getDashboardData: ({ onSuccess }) => {
        return async dispatch => {
            try {
                dispatch(GeneralActions.ShowLoading());
                let request = await get(APIs.Dashboard);
                if (request) {
                    dispatch(GeneralActions.SetDashboardData(request))
                    onSuccess(true)
                    return;
                }
                onSuccess(false)
                dispatch(GeneralActions.HideLoading());
            } catch (error) {
                onSuccess(false)
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
    getHelp: (data) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("text", data.help);
                let request = await post(APIs.Help, formData);
                if (request) {
                    data.onSuccess(true);
                    return;
                }
                data.onSuccess(false);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
    TradeIn: (data) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("name", data.pname);
                formData.append("email", data.email);
                formData.append("brand_id", data.brand);
                formData.append("phone", data.phone);
                formData.append("model_name", data.name);
                formData.append("model_num", data.model);
                formData.append("model_price", data.price);
                formData.append("model_condition", data.condition);
                formData.append("packing", data.box_paper);
                formData.append("comments", data.comments);
                data.images.forEach((img) => {
                    formData.append("images[]", img);
                })
                let request = await post(APIs.TradeIn, formData, {
                    'Content-Type': "multipart/form-data"
                });
                if (request) {
                    data.onSuccess(true);
                    return;
                }
                data.onSuccess(false);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    }
};
