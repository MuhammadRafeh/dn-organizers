export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (uid, email, isAdmin, isAuth) => { // It will take credentials
    return {
        type: AUTHENTICATE,
        payload: {
            uid,
            email,
            isAdmin,
            isAuth
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
        payload: {
            uid: '',
            email: '',
            isAdmin: true,
            isAuth: true
        }
    }
}
