import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

const SessionsContext = createContext();

export function useSessions() {
    return useContext(SessionsContext);
}

export const SessionsProvider = ({ children }) => {
    const DEBUG_RESET_MEMORY = false;
    const DEBUG_SAMPLE_DATA = true;

    const [sessions, setSessions] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            // resets the memory
            if (DEBUG_RESET_MEMORY) {
                await resetSessions()
                console.log('SessionsProvider DEBUG: reseting sessions memory')
            }

            // clears memory and add sample data
            if (DEBUG_SAMPLE_DATA) {
                const session = {
                    startDate: new Date(),
                    startTime: new Date(),
                    endTime: new Date(),
                    title: '',
                    secondsElapsed: 1,
                    secondsInterval: 1,
                    totalPrice: 1,
                    pricePerInterval: 1,
                    notes: '',
                }
                await resetSessions()
                await addSession({ ...session, title: 'Andrew Vocal Recording' })
                await addSession({ ...session, title: 'Sam Private Tutoring' })
                await addSession({ ...session, title: 'Joe Billable Hours' })
                await addSession({ ...session, title: 'Hanna Baby Sitting Time' })
                await addSession({ ...session, title: 'Steve Therapy Session' })
                // await addSession({ ...session, title: '' })
                // await addSession({ ...session, title: '' })
                // await addSession({ ...session, title: '' })
                // await addSession({ ...session, title: '' })
                // await addSession({ ...session, title: '' })

            }

            // inits sessions
            await getSessions();
        })()
    }, [])

    /** add session to local storage and set state
     * @returns sessions array */
    const addSession = async (newSession = {
        startDate,
        startTime,
        endTime,
        title,
        secondsElapsed,
        secondsInterval,
        totalPrice,
        pricePerInterval,
        notes,
    }) => {
        // gets session object
        let localSessions = await getSessions();
        // if reading errorr, return null
        if (localSessions === null) {
            console.log('LocalStorage, addSession: couldnt get data');
            // set state to match local storage
            setSessions(null);
            return null;
        }
        // add new session to sessions object
        localSessions.unshift(newSession)
        // try update local sessions
        try {
            await AsyncStorage.setItem('sessions', JSON.stringify(localSessions));
        } catch (e) {
            console.log('LocalStorage, addSession: staving error');
            // match state to local storage
            setSessions(localSessions);
            return null;
        }
        setLoading(true);
        // set sessions state
        setSessions(_ => localSessions);
        setLoading(false);

        // log
        console.log("session added to storage: " + JSON.stringify(newSession))
        // return the updated session array
        return localSessions;
    }

    /** remove session from local storage and set state
 * @param sessions index of item to remove */
    const removeSession = async (index) => {
        // gets session object
        let localSessions = await getSessions();
        // if reading errorr, return null
        if (localSessions === null) {
            console.log('LocalStorage, removeSession: couldnt get data');
            // set state to match local storage
            setSessions(null);
            return null;
        }
        // remove session from sessions object
        const removedItem = localSessions.splice(index, 1)
        // try update local sessions
        try {
            await AsyncStorage.setItem('sessions', JSON.stringify(localSessions));
        } catch (e) {
            console.log('LocalStorage, addSession: staving error');
            // match state to local storage
            setSessions(localSessions);
            return null;
        }
        setLoading(true);
        // set sessions state
        setSessions(_ => localSessions);
        setLoading(false);

        // log
        console.log("session removed from storage: " + JSON.stringify(removedItem))
        // return the updated session array
        return localSessions;
    }


    /** update value in a session in local storage and set state
 * @param sessions index of item to remove */
    const updateSession = async (index, key, value) => {
        // gets session object
        let localSessions = await getSessions();
        // if reading errorr, return null
        if (localSessions === null) {
            console.log('LocalStorage, updateSession: couldnt get data');
            // set state to match local storage
            setSessions(null);
            return null;
        }
        // update session from sessions object
        localSessions[index][key] = value;
        // try update local sessions
        try {
            await AsyncStorage.setItem('sessions', JSON.stringify(localSessions));
        } catch (e) {
            console.log('LocalStorage, addSession: staving error');
            // match state to local storage
            setSessions(localSessions);
            return null;
        }
        setLoading(true);
        // set sessions state
        setSessions(_ => localSessions);
        setLoading(false);

        // log
        console.log("session updated in storage: " + JSON.stringify(localSessions[index]))
        // return the updated session array
        return localSessions;
    }



    /** sets sessions to empty array in local storage and set state
     * @returns null if failed sessions array if sucsessfull
    */
    const resetSessions = async () => {
        // try update local sessions
        try {
            await AsyncStorage.setItem('sessions', JSON.stringify([]));
            // if saving error ... log
        } catch (e) {
            console.log('LocalStorage, resetSessions: staving error', e);
            return null;
        }
        // if no saving error...
        // make state match local storage
        setSessions([]);
        return [];
    }


    /**
    * gets sessions object array from local storage and set state
    * @returns null if failed, empty array if not set
    */
    const getSessions = async () => {
        // try get value from local storage
        try {
            var sessionsJSON = await AsyncStorage.getItem('sessions');
            // if reading error ... return null
        } catch (e) {
            console.log('LocalStorage, getSessions: reading value error');
            // match state to local storage
            setSessions(null);
            return null;
        }
        // if not found ... retun empty array and update local storage
        if (sessionsJSON === null) {
            // update local storage
            await AsyncStorage.setItem('sessions', JSON.stringify([]));
            // make state match local storage
            setSessions([]);
            return [];
        }
        // if no errors ... parse JSON
        const sessionsObj = JSON.parse(sessionsJSON);
        // make state match local storage
        setSessions(sessionsObj);
        // return array
        return sessionsObj;
    }

    return (
        <SessionsContext.Provider value={[sessions, addSession, resetSessions, removeSession, updateSession]}>
            {children}
        </SessionsContext.Provider>
    )
}



