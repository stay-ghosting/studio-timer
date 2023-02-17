import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Hr from '../components/Hr';
import { HMSFormatted, SecondsToHMS } from '../components/HMS';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


const TimerInfoScreen = ({ route }) => {
    let {
        startDate,
        startTime,
        endTime,
        title,
        secondsElapsed,
        secondsInterval,
        totalPrice,
        pricePerInterval,
        notes,
        fromTimer,
    } = route.params;

    startDate = new Date(startDate);
    startTime = startTime ? new Date(startTime) : null;
    endTime = new Date(endTime);


    console.log('timer screen: ' + JSON.stringify(route.params))

    const navigation = useNavigation();

    const dateFormated = (date) =>
        JSON.stringify(date).replace('"', '').split('T')[0].split('-').slice(0, 3).join('/');

    const timeFormated = (date) =>
        JSON.stringify(date).split('T')[1].split('.')[0].split(':').slice(0, 3).join(':');

    // checks if timer started
    const secondsPaused = startTime ?
        (Math.abs(endTime.getTime() - startTime.getTime()) / 1000) - secondsElapsed :
        0;

    const intervalsPassed = Math.floor(secondsElapsed / secondsInterval);


    return (
        <SafeAreaView className='px-4'>
            <View className='flex-row items-center'>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        if (fromTimer) {
                            navigation.navigate('NewTimer')
                        } else {
                            navigation.navigate('History')

                        }
                    }}
                    className='flex-1'>
                    <AntDesign name='left' size={25} />
                </TouchableOpacity>
                <Text className='text-4xl text-center py-5'>Timer Info</Text>
                <View className='flex-1'></View>
            </View>

            <ListInfo title='timer title' info={title} />
            <Text />
            <Hr />
            <Text />
            <ListInfo title='setup date' info={dateFormated(startDate)} />
            <ListInfo title='setup time' info={timeFormated(startDate)} />
            <Text />
            <ListInfo title='timer start date' info={(startTime) ? dateFormated(startTime) : 'not started'} />
            <ListInfo title='timer start time' info={(startTime) ? timeFormated(startTime) : 'not started'} />
            <Text />
            <ListInfo title='timer end date' info={(endTime) ? dateFormated(endTime) : 'N/A'} />
            <ListInfo title='timer end time' info={(endTime) ? timeFormated(endTime) : 'N/A'} />
            <Text />
            <Hr />
            <Text />
            <ListInfo title='time elapsed' info={HMSFormatted(SecondsToHMS(secondsElapsed))} />
            <ListInfo title='time paused' info={HMSFormatted(SecondsToHMS(secondsPaused))} />
            <Text />
            <Hr />
            <Text />
            <ListInfo title='interval time' info={HMSFormatted(SecondsToHMS(secondsInterval))} />
            <ListInfo title='interval price' info={'£' + pricePerInterval} />
            <ListInfo title='intervals passed' info={intervalsPassed} />
            <Text />
            <Hr />
            <Text />
            <ListInfo title='total price' info={'£' + totalPrice} />
            <Text />
            <Text>notes:</Text>
            <Text className={`${notes || 'text-slate-400'}`}>{notes ? notes : 'no notes'}</Text>


        </SafeAreaView >
    )
}

const ListInfo = ({ title, info }) => {
    return (
        <View className='flex-row justify-between'>
            <Text>{title}</Text>
            <Text>{info}</Text>
        </View>
    )
}

export default TimerInfoScreen