import { Alert, ScrollView, Text, View } from 'react-native'
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

    const onClearHistory = () => {
        return Alert.alert(
            "Confirm Clear History",
            `Are you sure you want to clear history?
All sessions will be permanently deleted.`,
            [
                {
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => resetSessions(),
                },
            ]
        );
    }

    return (
        <SafeAreaView className='px-14 flex-1'>
            <Text className='text-4xl text-center py-5'>History</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                {Array.isArray(sessions) ?
                    sessions.length === 0 ?
                        <View className='items-center flex-1'>
                            <Text className='text-center' >There are no sessions in your history!</Text>
                            <Text className='text-center'>Your complete session timers will apear here...</Text>
                            <View className='flex-1' />
                        </View>
                        :
                        sessions.map((session, index) => {
                            console.log(index);
                            return <HistoryListItem session={session} index={index} key={index} />
                        })
                    :
                    <Text > Error</Text>

                }
            </ScrollView>
            <Button title='Clear History' onPress={onClearHistory} className='mb-5' />


        </SafeAreaView >
    )
}

export default HistoryScreen