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
                let formData = new FormData();
                if (search)
                    formData.append("search", search)
                if (type)
                    formData.append("type", type)

                let request = await post(next_url, formData);
                if (request) {
                    dispatch(ProductActions.GetAllProducts(request))
                    callback();
                }
            } catch (error) {
                callback()
                console.warn(error);
            }
        };
    },
    getWishlist: ({ next_url, onSuccess }) => {
        return async dispatch => {
            try {
                let request = await get(next_url);
                if (request) {
                    if (next_url == APIs.Wishlist)
                        dispatch(ProductActions.GetWishlist(request));
                    else
                        dispatch(ProductActions.GetMoreWishlist(request));
                    
                    onSuccess(true);
                    return;
                }
                onSuccess(false)
            } catch (error) {
                onSuccess(false)
                console.warn(error);
            }
        };
    },
    saveToWishlist: (data) => {
        return async dispatch => {
            try {
                dispatch(ProductActions.AddRemToWishlist(data));
                let formData = new FormData();
                formData.append("product_id", data.id)
                // dispatch(GeneralActions.ShowLoading());
                let request = await post(APIs.AddToWishlist, formData);
                if (request) {
                    
                }
                // dispatch(GeneralActions.HideLoading());
            } catch (error) {
                // dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
};
