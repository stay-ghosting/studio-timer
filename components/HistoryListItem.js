import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

const HistoryListItem = (session = {
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
    const dateFormated = session.session.startDate.toString().split('T')[0].split('-').slice(0, 3).join('/');
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className='flex-row items-center justify-between pt-2 pb-1 border-b border-slate-200'>
            <View>
                <Text className='text-lg text-slate-800'>{session.session.title}</Text>
                <Text className='text-slate-500'>{dateFormated}</Text>
            </View>
            <AntDesign name='right' />
        </TouchableOpacity>
    )
}

export default HistoryListItem