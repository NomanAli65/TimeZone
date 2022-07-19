/* eslint-disable prettier/prettier */
import { APIs } from '../../configs/APIs';
import { get, post } from '../../configs/AxiosConfig';
import { GeneralTypes } from '../ActionTypes/GeneralActionTypes';
import GeneralActions from '../Actions/GeneralActions';
import ProductActions from '../Actions/ProductActions';
import AlertAction from '../Actions/AlertActions';

export const ProductMiddleware = {
    getAllProducts: ({ next_url, search, type, callback }) => {
        return async dispatch => {
            try {
                if (!next_url) {
                    // dispatch(AlertAction.ShowAlert({
                    //     title:"Message",
                    //     message:"No more data",
                    // }))
                    return;
                }
                dispatch(GeneralActions.ShowLoading());
                let formData = new FormData();
                if (search)
                    formData.append("search", search)
                if (type)
                    formData.append("type", type)

                let request = await post(APIs.AllProducts, formData);
                if (request) {
                    dispatch(ProductActions.GetAllProducts(request))
                    callback();
                }
                //dispatch({ type: ActionTypes.HideLoading });
            } catch (error) {
                callback()
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
    getWishlist: ({ next_url }) => {
        return async dispatch => {
            try {
                if (!next_url) {
                    // dispatch(AlertAction.ShowAlert({
                    //     title:"Message",
                    //     message:"No more data",
                    // }))
                    return;
                }
                dispatch(GeneralActions.ShowLoading());
                let request = await get(next_url);
                if (request) {
                    dispatch(ProductActions.GetWishlist(request));
                }
                dispatch(GeneralActions.HideLoading());
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
    saveToWishlist: (data) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("product_id", data.id)
                dispatch(GeneralActions.ShowLoading());
                let request = await post(APIs.AddToWishlist, formData);
                if (request) {
                    dispatch(ProductActions.AddRemToWishlist(request));
                }
                dispatch(GeneralActions.HideLoading());
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
};
