import { View, Text, TouchableOpacity, Share, Platform, TextInput, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Hr from '../components/Hr';
import { HMSFormatted, SecondsToHMS } from '../utils/HMS';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSessions } from '../components/SessionsProvider';


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
        index,
    } = route.params;

    startDate = new Date(startDate);
    startTime = startTime ? new Date(startTime) : null;
    endTime = new Date(endTime);


    console.log('timer screen: ' + JSON.stringify(route.params))

    const navigation = useNavigation();
    const [newNotes, setNewNotes] = useState(notes);
    const [loading, setLoading] = useState(false);

    const [sessions, addSession, resetSessions, removeSession, updateSession] = useSessions();

    const dateFormated = (date) =>
        JSON.stringify(date).replace('"', '').split('T')[0].split('-').slice(0, 3).join('/');

    const timeFormated = (date) =>
        JSON.stringify(date).split('T')[1].split('.')[0].split(':').slice(0, 3).join(':');

    const shareSession = async () => {
        try {
            const result = await Share.share({
                title: `Studio Timer: ${title}`,
                message:
                    `Session Name - ${title}

Setup date - ${dateFormated(startDate)}
Setup time - ${timeFormated(startDate)}

Timer start date - ${(startTime) ? dateFormated(startTime) : 'not started'}
Timer start time - ${(startTime) ? timeFormated(startTime) : 'not started'}

Timer end date - ${(endTime) ? dateFormated(endTime) : 'N/A'}
Timer end time - ${(endTime) ? timeFormated(endTime) : 'N/A'}

Time elapsed - ${HMSFormatted(SecondsToHMS(secondsElapsed))}
Time paused - ${HMSFormatted(SecondsToHMS(secondsPaused))}

Interval time - ${HMSFormatted(SecondsToHMS(secondsInterval))}
Interval price - ${'£' + pricePerInterval}
Intervals passed - ${intervalsPassed}

Total price - ${'£' + totalPrice}${notes && `\n\nnotes:\n${newNotes}`}

From Studio Timer`
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

    const goBack = () => {
        if (fromTimer) {
            navigation.navigate('NewTimer')
        } else {
            navigation.navigate('History')
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
                            updateSession(index, 'notes', newNotes);
                            goBack();
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
            <ScrollView className='px-4'>
                <ListInfo title='Timer title' info={title} />
                <Text />
                <Hr />
                <Text />
                <ListInfo title='Setup date' info={dateFormated(startDate)} />
                <ListInfo title='Setup time' info={timeFormated(startDate)} />
                <Text />
                <ListInfo title='Timer start date' info={(startTime) ? dateFormated(startTime) : 'not started'} />
                <ListInfo title='Timer start time' info={(startTime) ? timeFormated(startTime) : 'not started'} />
                <Text />
                <ListInfo title='Timer end date' info={(endTime) ? dateFormated(endTime) : 'N/A'} />
                <ListInfo title='Timer end time' info={(endTime) ? timeFormated(endTime) : 'N/A'} />
                <Text />
                <Hr />
                <Text />
                <ListInfo title='Time elapsed' info={HMSFormatted(SecondsToHMS(secondsElapsed))} />
                <ListInfo title='Time paused' info={HMSFormatted(SecondsToHMS(secondsPaused))} />
                <Text />
                <Hr />
                <Text />
                <ListInfo title='Interval time' info={HMSFormatted(SecondsToHMS(secondsInterval))} />
                <ListInfo title='Interval price' info={'£' + pricePerInterval} />
                <ListInfo title='Intervals passed' info={intervalsPassed} />
                <Text />
                <Hr />
                <Text />
                <ListInfo title='Total price' info={'£' + totalPrice} />
                <Text />
                <Text>Notes:</Text>
                <TextInput
                    className='bg-slate-200 rounded-lg mt-2 p-4'
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={(value) => {
                        setLoading(true);
                        setNewNotes(value);
                        setLoading(false);
                        updateSession(index, 'notes', newNotes);
                    }}
                    value={newNotes} />
                <View className='h-96' />
                <View className='h-96' />
            </ScrollView>



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