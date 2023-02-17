import { Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSessions } from '../components/SessionsProvider';
import HistoryListItem from '../components/HistoryListItem';

const HistoryScreen = () => {
    const [sessions, addSession, resetSessions] = useSessions();

    useEffect(() => {
        console.log("history loading: " + JSON.stringify(sessions));
    }, [sessions])

    return (
        <SafeAreaView className='px-4'>
            <Text className='text-4xl text-center pt-5'>History</Text>

            {sessions ?
                sessions.map((session, index) => {
                    return <HistoryListItem session={session} key={index} />
                }) :
                <></>
            }
        </SafeAreaView>
    )
}

export default HistoryScreen