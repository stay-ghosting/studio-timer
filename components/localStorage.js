import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log('staving error', e);
        return
    }
}


export const getData = async (key) => {
    try {
        let toReturn;
        const value = await AsyncStorage.getItem(key).then(
            (value) => {
                toReturn = value;
            },
            (err) => {
                console.log('get data error');
                toReturn = false;
            }

        );
        return toReturn
    } catch (e) {
        return null
    }
}
