import firebase from 'firebase';



import {Alert} from 'react-native';
import firebase from 'firebase';

const uploadToFirebase = (reference, invoice, SucAlertMessageTitle, SucAlertMessageDesc, failAlertTitle, failAlertDesc) => {
    firebase.database().ref(reference).push(invoice).then((data) => {
        //success callback
        // dispatch(addPendingInvoice({ ...invoice, id: data.key }))
        Alert.alert(SucAlertMessageTitle, SucAlertMessageDesc, [{ text: 'Ok' }])
    }).catch((error) => {
        //error callback
        Alert.alert(failAlertTitle, failAlertDesc, [{ text: 'OK', style: 'destructive' }])
    })
}

export default uploadToFirebase;