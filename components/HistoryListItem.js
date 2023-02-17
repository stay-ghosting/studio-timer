import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const HistoryListItem = ({ session }) => {
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
    // console.log("item session:" + JSON.stringify(session))
    const dateFormated = startDate.toString().split('T')[0].split('-').slice(0, 3).join('/');

    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('timerInfoScreen', { ...session, fromTimer: false })
    }
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            className='flex-row items-center justify-between pt-2 pb-1 border-b border-slate-200'>
            <View>
                <Text className='text-lg text-slate-800'>{title}</Text>
                <Text className='text-slate-500'>{dateFormated}</Text>
            </View>
            <AntDesign name='right' />
        </TouchableOpacity>
    )
}

export default HistoryListItem