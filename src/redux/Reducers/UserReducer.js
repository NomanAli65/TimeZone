import React from "react";

import { UserTypes } from '../ActionTypes/UserActionTypes';

let initialSate = {
    methods: [],

};

const UserReducer = (state = initialSate, action) => {
    switch (action.type) {
        case UserTypes.ADD_CARD:
            state = { ...state, methods: [...state.methods, action.payload] };
            break;
        case UserTypes.DELETE_CARD:
            let methods_copy = [...state.methods];
            methods_copy.splice(action.index, 1);
            state = { ...state, methods: methods_copy };
            break;
        case UserTypes.GET_ALL_METHODS:
            state = { ...state, methods: action.payload };
            break;
        default:
            break;
    }
    return state;
};

export default UserReducer;
