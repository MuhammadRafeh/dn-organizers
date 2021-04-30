export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (token, userId, isAdmin) => { // It will take token, userId & isAdmin
    return {
        type: AUTHENTICATE,
        payload: {
            userId,
            token, 
            isAdmin
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}
