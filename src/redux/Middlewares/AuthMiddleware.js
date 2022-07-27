/* eslint-disable prettier/prettier */
import { APIs } from '../../configs/APIs';
import { get, post } from '../../configs/AxiosConfig';
import AuthAction from '../Actions/AuthActions';

export const AuthMiddleware = {
    Login: (data) => {
        return async dispatch => {
            try {
                data.onRequest();
                let formData = new FormData();
                formData.append("email", data.email);
                formData.append("password", data.password);
                formData.append("device_id", "");
                let request = await post(APIs.Login, formData);
                if (request) {
                    data.onSuccess(true, "");
                    dispatch(AuthAction.Login(request))
                }
                else
                    data.onSuccess(false, request.message);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
    ForgotPassword: (data) => {
        return async dispatch => {
            try {
                data.onRequest();
                let formData = new FormData();
                formData.append("email", data.email);
                let request = await post(APIs.ForgotPassword, formData);
                if (request) {
                    data.onSuccess(true, request.message);
                }
                else
                    data.onSuccess(false, request.message);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
    ResetPassword: (data) => {
        return async dispatch => {
            try {
                data.onRequest();
                let formData = new FormData();
                formData.append("email", data.email);
                formData.append("password", data.password);
                formData.append("confirm_password", data.c_password);
                let request = await post(APIs.ResetPassword, formData);
                if (request) {
                    data.onSuccess(true, request.message);
                }
                else
                    data.onSuccess(false, request.message);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
    SignUp: (data) => {
        return async dispatch => {
            try {
                data.onRequest();
                let formData = new FormData();
                formData.append("name", data.f_name + " " + data.l_name);
                formData.append("email", data.email);
                formData.append("password", data.password);
                formData.append("confirm_password", data.c_password);
                formData.append("device_id", "");
                console.warn(formData)
                let request = await post(APIs.Register, formData);
                if (request) {
                    data.onSuccess(true, request.message);
                    dispatch(AuthAction.Login(request))
                }
                else
                    data.onSuccess(false, request.message);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
};
