/* eslint-disable prettier/prettier */
import { APIs } from '../../configs/APIs';
import { get, post } from '../../configs/AxiosConfig';
import { GeneralTypes } from '../ActionTypes/GeneralActionTypes';
import GeneralActions from '../Actions/GeneralActions';
import ProductActions from '../Actions/ProductActions';

export const ProductMiddleware = {
    getAllProducts: () => {
        return async dispatch => {
            try {
                dispatch(GeneralActions.ShowLoading());
                let request = await get(APIs.AllProducts);
                if (request) {
                    dispatch(ProductActions.GetAllProducts(request))
                }
                //dispatch({ type: ActionTypes.HideLoading });
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
    getWishlist: ({next_url}) => {
        return async dispatch => {
            try {
                dispatch(GeneralActions.ShowLoading());
                let request = await get(next_url);
                if (request) {
                    dispatch(GeneralActions.GetWishlist(request));
                }
                dispatch(GeneralActions.HideLoading());
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
};
