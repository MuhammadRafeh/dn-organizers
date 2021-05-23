export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const UPDATEWEDDING = 'UPDATEWEDDING';
export const UPDATEBIRTHDAY = 'UPDATEBIRTHDAY';
export const UPDATECORPORATE = 'UPDATECORPORATE';
export const ADDPENDINGINVOICE = 'ADDPENDINGINVOICE';
export const SETPENDINGINVOICES = 'SETPENDINGINVOICES';
export const SETITEMS = 'SETITEMS';
export const DELETEPENDINGINVOICE = 'DELETEPENDINGINVOICE';
export const UPDATEPENDINGINVOICE = 'UPDATEPENDINGINVOICE';
export const SETBIRTHDAYITEMS = 'SETBIRTHDAYITEMS';
export const SETCORPORATEITEMS = 'SETCORPORATEITEMS';
export const SETWEDDINGITEMS = 'SETWEDDINGITEMS';

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

export const updateWedding = (objRes) => { //in objRes key is a firebase key and value is a package
    return {
        type: UPDATEWEDDING,
        payload: objRes
    }
}

export const updateBirthday = (objRes) => { //in objRes key is a firebase key and value is a package
    return {
        type: UPDATEBIRTHDAY,
        payload: objRes
    }
}

export const updateCorporate = (objRes) => { //in objRes key is a firebase key and value is a package
    return {
        type: UPDATECORPORATE,
        payload: objRes
    }
}

export const addPendingInvoice = object => { //{price, theme, menu, venu, eventName, isPackage, serPackName, serPackId, userEmail, bookDate, occuredDate, designerName, status}
    return {
        type: ADDPENDINGINVOICE,
        payload: object
    }
}

export const setPendingInvoices = (object, email) => {
    return {
        type: SETPENDINGINVOICES,
        payload: {
            object,
            email
        }
    }
}

export const updatePendingInvoice = (id, update) => { //id which we want to update and in update we have undated info
    return {
        type: UPDATEPENDINGINVOICE,
        payload: {
            id,
            update
        }
    }
}

export const setItems = (wed, birth, corp) => { // obj that returned from firebase
    return {
        type: SETITEMS,
        payload: {
            wed,
            birth,
            corp
        }
    }
}

export const setBirthdayItems = (item) => { // obj that returned from firebase
    return {
        type: SETBIRTHDAYITEMS,
        payload: item
    }
}
export const setWeddingItems = (item) => { // obj that returned from firebase
    return {
        type: SETWEDDINGITEMS,
        payload: item
    }
}
export const setCorporateItems = (item) => { // obj that returned from firebase
    return {
        type: SETCORPORATEITEMS,
        payload: item
    }
}

export const deletePendingInvoice = id => { //firebase generated Id
    return {
        type: DELETEPENDINGINVOICE,
        payload: id
    }
}
