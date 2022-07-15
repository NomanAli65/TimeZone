import React from "react";

import { UserTypes } from '../ActionTypes/UserActionTypes';

let initialSate = {
    methods: null,

};

const UserReducer = (state = initialSate, action) => {
    switch (action.type) {
        case UserTypes.ADD_CARD:
            state = { ...state, methods: { ...state.methods, data: [...state.methods.data, action.payload] } };
            break;
        case UserTypes.DELETE_CARD:
            let methods_copy = [...state.methods.data];
            methods_copy.splice(action.index, 1);
            state = { ...state, methods: { ...state.method, data: methods_copy } };
            break;
        case UserTypes.GET_ALL_METHODS:
            state = { ...state, methods: { ...state.methods, data: [...state.methods.data, action.payload.data] } };
            break;
        default:
            break;
    }
    return state;
};

export default UserReducer;
