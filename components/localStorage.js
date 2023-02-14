import AsyncStorage from '@react-native-async-storage/async-storage';

/** add session to local storage
 * @returns sessions array */
export const addSessionLocal = async (newSession = {
    startDate,
    endDate,
    title,
    secondsElapsed,
    secondsInterval,
    totalPrice,
    pricePerInterval,
    notes,
}) => {
    // gets session object
    let sessions = await getSessionsLocal();
    // if reading errorr, return null
    if (sessions === null) {
        console.log('LocalStorage, addSession: couldnt get data');
        return null;
    }
    // add new session to sessions object
    sessions.push(newSession);
    // try update local sessions
    try {
        await AsyncStorage.setItem('sessions', JSON.stringify(sessions));
    } catch (e) {
        console.log('LocalStorage, addSession: staving error');
        return null;
    }
    // return the updated session array
    return sessions;
}


/** sets sessions to empty array in local storage */
export const resetSessionsLocal = async () => {
    // try update local sessions
    try {
        await AsyncStorage.setItem('sessions', JSON.stringify([]));
        // if saving error ... log
    } catch (e) {
        console.log('LocalStorage, resetSessions: staving error', e);
    }
}


/**
* gets sessions object array from local storage
* @returns null if failed, empty array if not set
*/
export const getSessionsLocal = async () => {
    // try get value from local storage
    try {
        var sessionsJSON = await AsyncStorage.getItem('sessions');
        // if reading error ... return null
    } catch (e) {
        console.log('LocalStorage, getSessions: reading value error');
        return null;
    }
    // if not found ... retun empty array and update local storage
    if (sessionsJSON === null) {
        await AsyncStorage.setItem('sessions', JSON.stringify([]));
        return [];
    }
    // if no errors ... parse JSON
    const sessionsObj = JSON.parse(sessionsJSON);
    // return array
    return sessionsObj;
}
