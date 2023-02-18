import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSessions } from './SessionsProvider';
import Feather from 'react-native-vector-icons/Feather';

const HistoryListItem = ({ session, index }) => {
    const {
        startDate,
        startTime,
        endTime,
        title,
        secondsElapsed,
        secondsInterval,
        totalPrice,
        pricePerInterval,
        notes,
    } = session

    const [sessions, addSession, resetSessions, removeSession] = useSessions();

    // console.log("item session:" + JSON.stringify(session))
    const dateFormated = startDate.toString().split('T')[0].split('-').slice(0, 3).join('/');

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('timerInfoScreen', { ...session, fromTimer: false, index, })
    }

    return (
        <View className='flex-row items-center'>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                className='flex-row flex-1 items-center justify-between pt-2 pb-1 border-b border-slate-200' >
                <View>
                    <Text className='text-lg text-slate-800'>{title}</Text>
                    <Text className='text-slate-500'>{dateFormated}</Text>
                </View>
            </TouchableOpacity >
            <TouchableOpacity
                activeOpacity={0.8}
                className='p-2'
                onPress={() => removeSession(index)}>
                <Feather name='trash' size={20} />
            </TouchableOpacity>
        </View>
    )
}

export default HistoryListItem