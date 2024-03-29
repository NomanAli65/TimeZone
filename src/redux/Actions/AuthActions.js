import {
    AuthTypes
} from '../ActionTypes/AuthTypes';

class AuthAction {
    static UpdateUserProfile = payload => {
        return {
            type: AuthTypes.UPDATE_USER_PROFILE,
            payload: payload,
        };
    };
    static Logout = payload => {
        return {
            type: AuthTypes.LOGOUT,
            payload: payload,
        };
    };
    static Login = payload => {
        return {
            type: AuthTypes.LOGIN,
            payload: payload,
        };
    };
}

export default AuthAction;
