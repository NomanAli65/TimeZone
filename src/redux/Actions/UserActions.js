import {
    UserTypes
} from '../ActionTypes/UserActionTypes';

class UserActions {
    static AddCard = (payload) => {
        return {
            type: UserTypes.ADD_CARD,
            payload
        };
    };
    static DeleteCard = (payload) => {
        return {
            type: UserTypes.DELETE_CARD,
            payload
        };
    };
    static GetAllMethods = (payload) => {
        return {
            type: UserTypes.GET_ALL_METHODS,
            payload
        };
    };
}

export default UserActions;
