import { combineReducers } from "redux";
import Package from "../models/package";
import { AUTHENTICATE, LOGOUT, UPDATEBIRTHDAY, UPDATECORPORATE, UPDATEWEDDING } from "./actions";

const initialAuthState = {
    uid: '',
    email: '',
    isAdmin: false,
    isAuth: false
}

const authReducer = (state = initialAuthState, action) => {
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

const initialPackageState = {
    wedding: [],
    birthday: [],
    corporate: []
}

const transformIntoPackage = (payload) => {
    const transformData = [];
    const response = payload;
    for (let id in response) {
        transformData.push(
            new Package(id, response[id].name, response[id].price, response[id].theme, response[id].menu, response[id].venu)
        )
    }
    return transformData;
}

const packageReducer = (state = initialPackageState, action) => {
    switch (action.type) {
        case UPDATEBIRTHDAY:
            return {
                ...state,
                birthday: transformIntoPackage(action.payload)
            }
        case UPDATECORPORATE:
            return {
                ...state,
                corporate: transformIntoPackage(action.payload)
            }
        case UPDATEWEDDING:
            return {
                ...state,
                wedding: transformIntoPackage(action.payload)
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    auth: authReducer,
    packages: packageReducer
})

export default rootReducer
