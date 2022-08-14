/* eslint-disable prettier/prettier */
import { APIs } from '../../configs/APIs';
import { get, post } from '../../configs/AxiosConfig';
import GeneralActions from '../Actions/UserActions';
import UserActions from '../Actions/UserActions';

export const UserMiddleware = {
    getAllMethods: ({ onSuccess }) => {
        return async dispatch => {
            try {
                // dispatch(GeneralActions.ShowLoading());
                let request = await get(APIs.GetPaymentMethods);
                if (request) {
                    dispatch(UserActions.GetAllMethods(request))
                    onSuccess(true);
                    return;
                }
                onSuccess(false)
                // dispatch(GeneralActions.HideLoading());
                //dispatch({ type: ActionTypes.HideLoading });
            } catch (error) {
                onSuccess(false)
                // dispatch(GeneralActions.HideLoading());
                console.warn(error);
            }
        };
    },
    AddMethod: (data) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("card_number", data.number);
                formData.append("exp_date", data.expiry);
                formData.append("cvc", data.cvc);
                let request = await post(APIs.AddCard, formData);
                console.warn(request)
                if (request) {
                    data.onSuccess(true);
                    dispatch(UserActions.AddCard(request))
                }
                else
                    data.onSuccess(false);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
    DeleteMethod: (data) => {
        return async dispatch => {
            try {
                dispatch(UserActions.DeleteCard(data.index))
                let formData=new FormData();
                formData.append("id",data.id)
                let request = await post(APIs.DeletePaymentMethod,formData);
                if (request) {
                    data.onSuccess()
                }
            } catch (error) {
                console.warn(error);
            }
        };
    },
    DefaultMethod: (data) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("source_id", data);
                let request = await post(APIs.SetDefaultPaymentMethod, formData);
                if (request) {
                    dispatch(UserActions.GetAllMethods(request))
                }
                //dispatch({ type: ActionTypes.HideLoading });
            } catch (error) {
                console.warn(error);
            }
        };
    },
};
