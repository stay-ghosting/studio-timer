import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AndroidSafeView from '../components/AndroidSafeView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HMSToSeconds, SecondsToHMS } from '../components/HMS';
import { PauseIcon, PlayIcon, CheckIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';


const TimerScreen = ({ route }) => {
    const { pricePerInterval, intervalHMS, sessionName } = route.params;

    const navigation = useNavigation();

    const [isPaused, setIsPaused] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const timeElapsedHMS = SecondsToHMS(seconds);


    // seconds passed / seconds in an interval
    const intervalsPassed = Math.floor(HMSToSeconds(timeElapsedHMS) / HMSToSeconds(intervalHMS));

    const currentPrice = intervalsPassed * pricePerInterval;

    const progressToInteraval = (seconds - (intervalsPassed * HMSToSeconds(intervalHMS))) / HMSToSeconds(intervalHMS)

    const isSetUp = pricePerInterval !== 0 &&
        /^[\w\s]+$/.test(sessionName) &&
        (intervalHMS.h || intervalHMS.m);


    const pauseTimer = () => {
        setIsPaused(true);
    }

    const resumeTimer = () => {
        setIsPaused(false);
    }

    const toggleTime = () => {
        setIsPaused(!isPaused)
    }

    useEffect(() => {
        if (isSetUp) {
            // if paused
            if (isPaused) {
                setIsRunning(() => false);
                // clear interval
                try {
                    clearInterval(interval)
                } catch (err) { }
                // if active
            } else {
                if (!isRunning) {
                    setIsRunning(() => true);
                    // set interval
                    interval = setInterval(() => {
                        setSeconds(seconds => seconds + 1);
                    }, 1000);
                }
            }
        }
        // on unmount clear interval
        return () => {
            try {
                clearInterval(interval)
            } catch (err) { }
        };
    }, [isPaused]);

    const showConfirmFinish = () => {
        const details = {
            timeElapsedHMS: timeElapsedHMS,
            currentPrice: currentPrice,
        }

        return Alert.alert(
            "Confirm Finish Timer",
            `
Details:
time elapsed: ${timeElapsedHMS.h.toString().padStart(2, '0')}:${timeElapsedHMS.m.toString().padStart(2, '0')}:${timeElapsedHMS.s.toString().padStart(2, '0')}
current price: £${currentPrice}

Are you sure you want to end the timer?`,
            [
                {
                    text: "Yes",
                    onPress: () => {

                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };



    return (
        <SafeAreaView style={AndroidSafeView.AndroidSafeArea} className='flex-1 px-5 items-center'>
            <View className='flex-1 items-center' >
                {/* session name */}
                {isSetUp &&
                    <>
                        <Text className='text-3xl text-black pt-24'>Studio Timer</Text>
                    </>
                }
            </View>
            <View className='justify-center items-center'>

                <TouchableOpacity
                    className='py-4 items-center'
                    onPress={() => {
                        if (isSetUp) {
                            setIsPaused(!isPaused)
                        } else {
                            navigation.navigate('timerSetupScreen')
                        }
                    }}>
                    {isSetUp && <Text className='pb-4 text-lg'>Current Price £{currentPrice}</Text>}
                    {/* time */}
                    <Text className='text-6xl text-red-500 font-bold '>
                        {`${timeElapsedHMS.h.toString().padStart(2, '0')}:${timeElapsedHMS.m.toString().padStart(2, '0')}:${timeElapsedHMS.s.toString().padStart(2, '0')}`}
                    </Text>
                    {/* progress bar */}
                    {isSetUp && <Progress.Bar progress={progressToInteraval} width={200} color='#EF4444' />}
                    {
                        isSetUp ?
                            <Text>tap to {isPaused ? 'resume' : 'pause'}</Text> :
                            <Text>tap to set up timer</Text>
                    }
                </TouchableOpacity>
            </View>
            <View className='flex-1 justify-end'>
                {isSetUp &&
                    <>
                        {/* done button */}
                        <TouchableOpacity
                            className='px-4 py-2 mb-10 bg-red-500 align-middle justify-center'
                            onPress={() => { showConfirmFinish() }}>
                            <Text className='text-white'>Done</Text>
                        </TouchableOpacity>
                    </>}
            </View>
        </SafeAreaView >

    )
}

export default TimerScreen