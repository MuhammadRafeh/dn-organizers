import { combineReducers } from "redux";
import { AUTHENTICATE, LOGOUT } from "./actions";

const initialStateAuth = {
    token: '',
    userId: '',
    isAdmin: false
}

const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                uid: action.payload.uid,
                email: action.payload.email,
                isAdmin: action.payload.isAdmin
            }
        case LOGOUT:
            return initialStateAuth;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer
