/* eslint-disable prettier/prettier */
import { APIs } from '../../configs/APIs';
import { get, post } from '../../configs/AxiosConfig';
import GeneralActions from '../Actions/UserActions';
import UserActions from '../Actions/UserActions';

export const UserMiddleware = {
    getAllMethods: ({ next_url }) => {
        return async dispatch => {
            try {
                dispatch(GeneralActions.ShowLoading());
                let request = await get(next_url);
                if (request) {
                    dispatch(UserActions.GetAllMethods(request))
                }
                dispatch(GeneralActions.HideLoading());
                //dispatch({ type: ActionTypes.HideLoading });
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
    AddMethod: (data) => {
        return async dispatch => {
            try {
                let formData=new FormData();
                formData.append("card_number",data.number);
                formData.append("exp_date",data.expiry);
                formData.append("cvc",data.cvc);
                dispatch(GeneralActions.ShowLoading());
                let request = await post(APIs.AddCard,formData);
                if (request) {
                    data.onSuccess();
                    dispatch(UserActions.AddCard(request))
                }
                dispatch(GeneralActions.HideLoading());
                //dispatch({ type: ActionTypes.HideLoading });
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
    DeleteMethod: (data) => {
        return async dispatch => {
            try {
                dispatch(UserActions.DeleteCard(data.index))
                dispatch(GeneralActions.ShowLoading());
                let request = await get(APIs.DeletePaymentMethod);
                if (request) {
                }
                dispatch(GeneralActions.HideLoading());
                //dispatch({ type: ActionTypes.HideLoading });
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
    DefaultMethod: (data) => {
        return async dispatch => {
            try {
                let formData=new FormData();
                formData.append("id",data.id);
                dispatch(GeneralActions.ShowLoading());
                let request = await post(APIs.SetDefaultPaymentMethod,formData);
                if (request) {
                }
                dispatch(GeneralActions.HideLoading());
                //dispatch({ type: ActionTypes.HideLoading });
            } catch (error) {
                dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
};
