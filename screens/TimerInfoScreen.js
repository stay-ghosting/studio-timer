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
import DismissKeyboardView from '../components/DismissKeyboardView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


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
    const navigation = useNavigation();

    // the time the timer was created
    startDate = new Date(startDate);
    // the time te timer was first started
    startTime = startTime ? new Date(startTime) : null;
    // the time the timer was ended
    endTime = new Date(endTime);

    // the notes at the bottom of the screen
    const [newNotes, setNewNotes] = useState(notes);
    // used to refresh the ui
    const [loading, setLoading] = useState(false);

    // allows access and modifaction of sessions 
    const [sessions, addSession, resetSessions, removeSession, updateSession] = useSessions();

    /** @returns formated date from a Date object */
    const dateFormated = (date) =>
        JSON.stringify(date).replace('"', '').split('T')[0].split('-').slice(0, 3).join('/');
    /** @returns formated date from a Date object */
    const timeFormated = (date) =>
        JSON.stringify(date).split('T')[1].split('.')[0].split(':').slice(0, 3).join(':');
    /** allows sharing of the session data */
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

Interval time - ${HMSFormatted(SecondsToHMS(secondsInterval))}
Interval price - ${'??' + pricePerInterval}
Intervals passed - ${intervalsPassed}

Time elapsed - ${HMSFormatted(SecondsToHMS(secondsElapsed))}
Total price - ${'??' + totalPrice}${notes && `\n\nnotes:\n${newNotes}`}

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

    //** navigates back to new timer or history page */
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

    // the amount of intervals passed
    const intervalsPassed = Math.floor(secondsElapsed / secondsInterval);

    return (
        <SafeAreaView className='flex-1 px-4'>
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
            {/* details */}
            <KeyboardAwareScrollView
                extraScrollHeight={70}
                keyboardOpeningTime={0}
                className='px-4'>
                <ListInfo title='Timer title' info={title} />
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
                {/* <ListInfo title='Time paused' info={HMSFormatted(SecondsToHMS(secondsPaused))} /> */}
                <Hr />
                <Text />
                <ListInfo title='Interval time' info={HMSFormatted(SecondsToHMS(secondsInterval))} />
                <ListInfo title='Interval price' info={'??' + pricePerInterval} />
                <ListInfo title='Intervals passed' info={intervalsPassed} />
                <Hr />
                <Text />
                <ListInfo title='Time elapsed' info={HMSFormatted(SecondsToHMS(secondsElapsed))} />
                <ListInfo title='Total price' info={'??' + totalPrice} />
                <Text />
                <Text>Notes:</Text>
                <TextInput
                    className='bg-slate-200 rounded-lg mt-2 p-4'
                    multiline={true}
                    numberOfLines={newNotes.split('\n').length}
                    onChangeText={(value) => {
                        setLoading(true);
                        setNewNotes(value);
                        setLoading(false);
                        updateSession(index, 'notes', newNotes);
                    }}
                    value={newNotes} />
            </KeyboardAwareScrollView>
        </SafeAreaView >
    )
}

const ListInfo = ({ title, info }) => {
    return (
        <View className='flex-row pb-2 justify-between'>
            <Text>{title}</Text>
            <Text>{info}</Text>
        </View>
    )
}

export default TimerInfoScreen