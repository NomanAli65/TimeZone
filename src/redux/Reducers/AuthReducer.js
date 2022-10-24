import React from "react";

import { AuthTypes } from '../ActionTypes/AuthTypes';

let initialSate = {
    isLogin: undefined,
    user: null,
    addresses: []
};
// [
//     {
//         id:1,
//         title: "My Address",
//         address: "House b14 gulstiane johar",
//         is_default:0
//     },
//     {
//         id:2,
//         title: "My Address",
//         address: "House b14 gulstiane johar",
//         is_default:0
//     },
//     {
//         id:3,
//         title: "My Address",
//         address: "House b14 gulstiane johar",
//         is_default:0
//     },

//     {
//         id:4,
//         title: "My Address",
//         address: "House b14 gulstiane johar",
//         is_default:0
//     }, 
//     {
//         id:5,
//         title: "My Address",
//         address: "House b14 gulstiane johar",
//         is_default:0
//     },
//     {
//         id:6,
//         title: "My Address",
//         address: "House b14 gulstiane johar",
//         is_default:1
//     },
// ]
const AuthReducer = (state = initialSate, action) => {
    switch (action.type) {
        case AuthTypes.LOGIN:
            state = { ...state, user: action.payload, isLogin: true };
            break;
        case AuthTypes.UPDATE_USER_PROFILE:
            state = { ...state, user: { ...state.user, user: action.payload } };
            break;
        case AuthTypes.GET_ADDRESSES:
            state = { ...state, addresses: action.payload };
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
