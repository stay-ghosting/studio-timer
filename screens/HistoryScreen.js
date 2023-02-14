import { View, Text } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SessionsContext } from '../context/SessionsContext';

const HistoryScreen = () => {
    const [sessions, setSessions] = useState(useContext(SessionsContext));

    // const setData = async () => {
    //     const sessionJSON = await getData("sessions");
    //     const sessionsObj = JSON.parse(sessionJSON);
    //     setSessions(sessionsObj)
    // }

    useEffect(() => {
        console.log(sessions);
    }, [])

    return (
        <SafeAreaView>
            <Text className='text-4xl text-center pt-5'>History</Text>

            {sessions ?
                sessions.map((session, index) => {
                    return <Text key={index}>{session.title}</Text>
                }) :
                <></>
            }
        </SafeAreaView>
    )
}

export default HistoryScreen