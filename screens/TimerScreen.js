import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import AndroidSafeView from '../components/AndroidSafeView';
import { selectHMS, selectSeconds } from '../slices/timeElapsedSlice'
import { SafeAreaView } from 'react-native-safe-area-context';
import Timer from '../components/Timer';
import { useSelector } from 'react-redux';
import { HMSToSeconds } from '../components/HMS';



const TimerScreen = ({ route }) => {

    const { pricePerInterval, intervalHMS, sessionName } = route.params;
    const [time, setTime] = useState(0);

    const pause = useRef(null);
    const resume = useRef(null);

    const timeElapsedHMS = useSelector(selectHMS);

    // seconds passed / seconds in an interval
    const intervalsPassed = Math.floor(HMSToSeconds(timeElapsedHMS) / HMSToSeconds(intervalHMS));

    const currentPrice = intervalsPassed * pricePerInterval;


    return (
        <SafeAreaView style={AndroidSafeView.AndroidSafeArea} className='flex-1 px-5 items-center'>
            <Timer
                pause={pause}
                resume={resume} />
            <View className='flex-1 justify-center items-center'>
                <Text className='text-6xl font-bold pb-4'>
                    {`${timeElapsedHMS.h}:${timeElapsedHMS.m}:${timeElapsedHMS.s}`}
                </Text>
                <Text className='text-3xl text-gray-800'>
                    {sessionName}
                </Text>
                <Text>current price - £{currentPrice}</Text>
                <Text>£{pricePerInterval}/{intervalHMS.h}h{intervalHMS.m}m</Text>
            </View>
            <View className='flex-row space-x-2 mb-14'>
                <TouchableOpacity
                    className='px-4 py-2 bg-black rounded-md w-24 flex-row justify-center'
                    onPress={pause.current}>
                    <Text className='text-white'>pause</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='px-4 py-2 bg-black rounded-md w-24 flex-row justify-center'
                    onPress={resume.current}>
                    <Text className='text-white'>play</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >

    )
}

export default TimerScreen