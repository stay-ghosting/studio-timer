import { Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSessions } from '../components/SessionsProvider';

const HistoryScreen = () => {
    const [sessions, addSession, resetSessions] = useSessions();

    useEffect(() => {
        console.log("history loading: " + sessions);
    }, [sessions])

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