import { combineReducers } from "redux";
import { AUTHENTICATE, LOGOUT } from "./actions";

const initialStateAuth = {
    uid: '',
    email: '',
    isAdmin: false,
    isAuth: false
}

const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                // ...state,
                uid: action.payload.uid,
                email: action.payload.email,
                isAdmin: action.payload.isAdmin,
                isAuth: action.payload.isAuth,
            }
        case LOGOUT:
            return {
                // ...state,
                uid: action.payload.uid,
                email: action.payload.email,
                isAdmin: action.payload.isAdmin,
                isAuth: action.payload.isAuth,
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer
