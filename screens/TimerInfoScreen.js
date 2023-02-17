import { View, Text, TouchableOpacity, Share, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Hr from '../components/Hr';
import { HMSFormatted, SecondsToHMS } from '../components/HMS';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
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

    const shareSession = async () => {
        try {
            const result = await Share.share({
                title: title,
                message:
                    `Session Name - ${title}

setup date - ${dateFormated(startDate)}
setup time - ${timeFormated(startDate)}

timer start date - ${(startTime) ? dateFormated(startTime) : 'not started'}
timer start time - ${(startTime) ? timeFormated(startTime) : 'not started'}

timer end date - ${(endTime) ? dateFormated(endTime) : 'N/A'}
timer end time - ${(endTime) ? timeFormated(endTime) : 'N/A'}

time elapsed - ${HMSFormatted(SecondsToHMS(secondsElapsed))}
time paused - ${HMSFormatted(SecondsToHMS(secondsPaused))}

interval time - ${HMSFormatted(SecondsToHMS(secondsInterval))}
interval price - ${'£' + pricePerInterval}
intervals passed - ${intervalsPassed}

total price - ${'£' + totalPrice}${notes && `\n\nnotes: ${notes}`}`
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log('TimerInfoScreen: error sending')
        }
    }

    // checks if timer started
    const secondsPaused = startTime ?
        (Math.abs(endTime.getTime() - startTime.getTime()) / 1000) - secondsElapsed :
        0;

    const intervalsPassed = Math.floor(secondsElapsed / secondsInterval);

    return (
        <SafeAreaView className='px-4'>
            <View className='flex-row items-center'>
                <View className='flex-1 items-start'>
                    <TouchableOpacity
                        // className='bg-black'
                        activeOpacity={0.8}
                        onPress={() => {
                            if (fromTimer) {
                                navigation.navigate('NewTimer')
                            } else {
                                navigation.navigate('History')
                            }
                        }}>
                        <AntDesign name='left' size={25} />
                    </TouchableOpacity>
                </View>
                <Text className='text-4xl text-center py-5'>Timer Info</Text>
                <View className='flex-1 items-end'>
                    <TouchableOpacity
                        className='mr-1'
                        activeOpacity={0.8}
                        onPress={() => {
                            shareSession();
                        }}>
                        <Feather name={Platform.OS === 'ios' ? 'share' : 'share-2'} size={25} />
                    </TouchableOpacity>
                </View>
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