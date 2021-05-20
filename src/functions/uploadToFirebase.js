const handleBookPress = (id, name, theme, menu, venu, price) => {
    const invoice = {
        theme,
        menu,
        venu,
        price,
        eventName: 'wedding',
        isPackage: true,
        serPackName: name,
        serPackId: id,
        userEmail: email,
        bookDate: new Date().toString(),
        occuredDate: false,
        designerName: 'Mast Qalandar',
        // noOfPeople: peopleCount,
        status: 'inprogress'
    }
    firebase.database().ref('pendingInvoices/').push(invoice).then((data) => {
        //success callback
        dispatch(updatePendingInvoices({...invoice, id: data.key}))
        Alert.alert('Successfully added to Invoices', 'Please go to invoice section to clear first and continue.', [{ text: 'Ok' }])
    }).catch((error) => {
        //error callback
        Alert.alert("Can't book package.", 'Please check your internet connection!', [{ text: 'OK', style: 'destructive' }])
    })

}

export const handleBookPress
