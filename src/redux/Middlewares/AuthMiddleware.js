/* eslint-disable prettier/prettier */
import { APIs } from '../../configs/APIs';
import { get, post } from '../../configs/AxiosConfig';
import AuthAction from '../Actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                    await AsyncStorage.setItem("@TZ-USER", JSON.stringify(request));
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
                formData.append("phone", data.phone);
                formData.append("password", data.password);
                formData.append("confirm_password", data.c_password);
                formData.append("device_id", "");
                console.warn(formData)
                let request = await post(APIs.Register, formData);
                if (request) {
                    data.onSuccess(true, request.message);
                    dispatch(AuthAction.Login(request))
                    await AsyncStorage.setItem("@TZ-USER", JSON.stringify(request));
                }
                else
                    data.onSuccess(false, request.message);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
    ChangePassword: (data) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("old_password", data.old_pass);
                formData.append("new_password", data.password);
                let request = await post(APIs.ChangePassword, formData);
                if (request) {
                    data.onSuccess(true);
                }
                else
                    data.onSuccess(false);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
    UpdateProfile: (data) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("name", data.name);
                formData.append("phone", data.phone);
                formData.append("profile_pic", data.pic);
                formData.append("country", data.country);
                formData.append("city", data.city);
                formData.append("address", data.address);
                let request = await post(APIs.EditProfile, formData);
                if (request) {
                    data.onSuccess(true);
                    dispatch(AuthAction.UpdateUserProfile(request))
                    await AsyncStorage.setItem("@TZ-USER", JSON.stringify({ ...data.old_data, user: request }));
                }
                else
                    data.onSuccess(false);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
    getTax: (data) => {
        return async dispatch => {
            try {
                let request = await get(APIs.GetVAT);
                if (request) {
                    data.onSuccess(request);
                }
                else
                    data.onSuccess(false);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    }
};
