import {Alert} from 'react-native';
import firebase from 'firebase';
import { addItems, addPackage } from '../redux/actions';

const uploadToFirebase = (reference, pushData, SucAlertMessageTitle, SucAlertMessageDesc, failAlertTitle, failAlertDesc, dispatch, action) => {
    firebase.database().ref(reference).push(pushData).then((data) => {
        //success callback
        // dispatch(addPendingInvoice({ ...invoice, id: data.key }))
        if (action == 'addVenu') {
            dispatch(addItems('weddingItems', 'venu', {...pushData, id: data.key }));
        } else if (action == 'addPackage') {
            dispatch(addPackage('wedding', {...pushData, id: data.key}))
        } else if (action == 'addMenu') {
            dispatch(addItems('weddingItems', 'menu', {...pushData, id: data.key }));
        }

        try {
            dispatch(action);
        } catch (error) {
        }
        Alert.alert(SucAlertMessageTitle, SucAlertMessageDesc, [{ text: 'Ok' }])
    }).catch((error) => {
        //error callback
        Alert.alert(failAlertTitle, failAlertDesc, [{ text: 'OK', style: 'destructive' }])
    })
}

export default uploadToFirebase;
