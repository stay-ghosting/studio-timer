import { ScrollView, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSessions } from '../components/SessionsProvider';
import HistoryListItem from '../components/HistoryListItem';
import Button from '../components/Button';
import { TouchableOpacity } from 'react-native';

const HistoryScreen = () => {
    const [sessions, addSession, resetSessions] = useSessions();
    const DEBUG = true;

    useEffect(() => {
        console.log("history loading: " + JSON.stringify(sessions));
    }, [sessions])

    console.log(sessions)
    return (
        <SafeAreaView className='px-6 flex-1'>
            <Text className='text-4xl text-center py-5'>History</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                {Array.isArray(sessions) ?
                    sessions.length === 0 ?
                        <View className='items-center flex-1'>
                            <Text>there are no sessions in your history!</Text>
                            <Text>Your complete session timers will apear here</Text>
                            <View className='flex-1' />
                        </View>
                        :
                        sessions.map((session, index) => {
                            return <HistoryListItem session={session} key={index} />
                        })
                    :
                    <Text > Error</Text>

                }
            </ScrollView>
            {DEBUG &&
                <TouchableOpacity
                    onLongPress={resetSessions}>
                    <Text>reset</Text>
                </TouchableOpacity>
            }


        </SafeAreaView >
    )
}

export default HistoryScreen