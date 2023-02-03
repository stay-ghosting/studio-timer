import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AndroidSafeView from '../components/AndroidSafeView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HMSToSeconds, SecondsToHMS } from '../components/HMS';
import { PauseIcon, PlayIcon, CheckIcon } from "react-native-heroicons/solid";


const TimerScreen = ({ route }) => {
    const { pricePerInterval, intervalHMS, sessionName } = route.params;


    const [isPaused, setIsPaused] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const timeElapsedHMS = SecondsToHMS(seconds);

    const [isSetUp, setIsSetUp] = useState(false);

    // seconds passed / seconds in an interval
    const intervalsPassed = Math.floor(HMSToSeconds(timeElapsedHMS) / HMSToSeconds(intervalHMS));

    const currentPrice = intervalsPassed * pricePerInterval;

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
        // if paused
        if (isPaused) {
            setIsRunning(() => false);
            // clear interval
            if (interval !== undefined) {
                clearInterval(interval)
            }
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
        // on unmount clear interval
        return () => clearInterval(interval);
    }, [isPaused]);




    return (
        <SafeAreaView style={AndroidSafeView.AndroidSafeArea} className='flex-1 px-5 items-center'>
            <View className='flex-1' />
            <View className='justify-center items-center'>
                {/* time */}
                <Text className='text-6xl font-bold pb-4'>
                    {`${timeElapsedHMS.h.toString().padStart(2, '0')}:${timeElapsedHMS.m.toString().padStart(2, '0')}:${timeElapsedHMS.s.toString().padStart(2, '0')}`}
                </Text>
                {/* session name */}
                <Text className='text-3xl text-gray-800'>
                    {sessionName}
                </Text>
                {/* details */}
                <Text className='text-lg'>current price - £{currentPrice}</Text>
                <Text>£{pricePerInterval}/{intervalHMS.h}h{intervalHMS.m}m</Text>
            </View>
            <View className='flex-1 justify-end'>
                <View className='flex-row justify-center space-x-2'>
                    {isSetUp ?
                        <>
                            {/* play / pause button */}
                            <TouchableOpacity
                                className='px-4 py-2 bg-black mb-10  w-14 h-14 align-middle justify-center'
                                onPress={toggleTime}>
                                {/* <PauseIcon></PauseIcon> */}
                                {isPaused ? <PlayIcon color='#ffffff' size={30} /> : <PauseIcon color='#ffffff' size={30} />}
                            </TouchableOpacity>
                            {/* done button */}
                            <TouchableOpacity
                                className='px-4 py-2 bg-black mb-10  w-14 h-14 align-middle justify-center'
                                onPress={() => { }}>
                                {/* <PauseIcon></PauseIcon> */}
                                {<CheckIcon color='#ffffff' size={30} />}
                            </TouchableOpacity>
                        </> :
                        <>
                            <TouchableOpacity
                                className='px-6 py-2 bg-black mb-10 h-14 align-middle justify-center'
                                onPress={() => { }}>
                                <Text className='text-white text-lg'>Set Up</Text>
                            </TouchableOpacity>
                        </>}
                </View>
            </View>
        </SafeAreaView >

    )
}

export default TimerScreen