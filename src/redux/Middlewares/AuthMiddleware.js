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
                formData.append("device_id", data.token);
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
    GetUser: (data) => {
        return async dispatch => {
            try {
                let request = await post(APIs.GetUser);
                if (request) {
                    data.onSuccess(true);
                    dispatch(AuthAction.UpdateUserProfile(request.user))
                    await AsyncStorage.setItem("@TZ-USER", JSON.stringify({ ...data.old_data, user: request.user }));
                }
                else
                    data.onSuccess(false, request.message);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
    deleteUser: (data) => {
        return async dispatch => {
            try {
                let request = await post(APIs.DeleteUser);
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
    SocialSignin: (data) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("email", data.email);
                formData.append("username", data.name ? data.name : "TZ User");
                formData.append("device_id", data.token);
                if (data?.pic)
                    formData.append("profile_pic", data.pic);

                console.warn(formData)
                let request = await post(APIs.SocialSignin, formData);
                if (request) {
                    data.onSuccess(true, "");
                    dispatch(AuthAction.Login(request))
                    await AsyncStorage.setItem("@TZ-USER", JSON.stringify(request));
                }
                else {
                    console.warn(request)
                    data.onSuccess(false, request?.message);
                }
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
                formData.append("country", data.country);
                formData.append("city", data.city);
                formData.append("address", data.address);
                formData.append("device_id", data.token);
                let request = await post(APIs.Register, formData);
                if (request) {
                    data.onSuccess(request, request.message);
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
                if (data.pic)
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
    SendVerificationCode: (data) => {
        return async dispatch => {
            try {
                let request = await post(APIs.SendCode);
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
    },
    VerifyPhone: (data) => {
        return async dispatch => {
            try {
                let request = await post(APIs.VerifyPhone);
                if (request) {
                    console.warn(request)
                    data.onSuccess(true);
                    dispatch(AuthAction.UpdateUserProfile(request.user))
                    await AsyncStorage.setItem("@TZ-USER", JSON.stringify({ ...data.old_data, user: request.user }));
                }
                else
                    data.onSuccess(false);
            } catch (error) {
                data.onSuccess(false);
                console.warn(error);
            }
        };
    },
    VerifyEmail: (data) => {
        return async dispatch => {
            try {
                let request = await post(APIs.VerifyEmail);
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
    },
    getAllAddress: ({ callback }) => {
        return async dispatch => {
            try {
                let request = await get(APIs.AllAddresses);
                if (request) {
                    dispatch(AuthAction.GetAddresses(request));

                    callback();
                }
            } catch (error) {
                callback()
                console.warn(error);
            }
        };
    },
    addAddress: ({ callback, ...data }) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("title", data.title);
                formData.append("address", data.address);
                formData.append("city", data.city);
                formData.append("country", data.country);
                let request = await post(APIs.AddAddress, formData);
                if (request) {
                    console.warn("Add Address======>", request)
                    dispatch(AuthAction.GetAddresses(request));

                    callback(true);
                }
                else
                    callback(false);
            } catch (error) {
                callback(false)
                console.warn(error);
            }
        };
    },
    defaultAddress: ({ callback, ...data }) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("id", data.id);
                formData.append("is_default", data.default);

                let request = await post(APIs.EditAddress, formData);
                if (request) {
                    dispatch(AuthAction.GetAddresses(request.address));
                    callback(true);
                }
                else
                    callback(false);
            } catch (error) {
                callback(false)
                console.warn(error);
            }
        };
    },
    editAddress: ({ callback, ...data }) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                formData.append("id", data.id);
                formData.append("title", data.title);
                formData.append("address", data.address);
                formData.append("city", data.city);
                formData.append("country", data.country);

                let request = await post(APIs.EditAddress, formData);
                if (request) {
                    dispatch(AuthAction.GetAddresses(request.address));
                    dispatch(AuthAction.UpdateUserProfile(request.user))
                    await AsyncStorage.setItem("@TZ-USER", JSON.stringify({ ...data.user, user: request.user }));
                    callback(true);
                }
                else
                    callback(false);
            } catch (error) {
                callback(false)
                console.warn(error);
            }
        };
    },
    deleteAddress: ({ callback, id, user }) => {
        return async dispatch => {
            try {
                let formData = new FormData();
                let request = await get(APIs.DeleteAddress + "/" + id);
                if (request) {
                    console.warn("Delete Address======> ", request)
                    dispatch(AuthAction.UpdateUserProfile(request.user))
                    await AsyncStorage.setItem("@TZ-USER", JSON.stringify({ ...user, user: request.user }));
                    callback();
                }
            } catch (error) {
                callback()
                console.warn(error);
            }
        };
    },
};
