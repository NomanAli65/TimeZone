import React from "react";

import { AuthTypes } from '../ActionTypes/AuthTypes';

let initialSate = {
    isLogin: undefined,
    user: null,
};

const AuthReducer = (state = initialSate, action) => {
    switch (action.type) {
        case AuthTypes.LOGIN:
            state = { ...state, user: action.payload, isLogin: true };
            break;
        case AuthTypes.UPDATE_USER_PROFILE:
            state = { ...state, user: { ...state.user, user: action.payload } };
            break;
        case AuthTypes.LOGOUT:
            state = {
                user: null,
                isLogin: false
            };
            break;
        default:
            break;
    }
    return state;
};

export default AuthReducer;
