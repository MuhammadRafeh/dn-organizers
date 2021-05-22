import * as MediaLibrary from 'expo-media-library';

const getGalleryPermission = async () => {
    const {status} = await MediaLibrary.requestPermissionsAsync();
    if (status == 'granted') {
        return true;
    }
    return false;
}

export default getGalleryPermission;
