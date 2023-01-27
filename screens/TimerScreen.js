import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AndroidSafeView from '../components/AndroidSafeView';
import { startTimer, pauseTimer, resetTimer, selectSeconds } from '../slices/timeElapsedSlice'
import { SafeAreaView } from 'react-native-safe-area-context';

const TimerScreen = () => {
    const dispatch = useDispatch();
    const seconds = useSelector(selectSeconds);

    return (
        <SafeAreaView style={AndroidSafeView.AndroidSafeArea} className='flex-1'>
            {/* <Text>{seconds}</Text> */}
            <TouchableOpacity
            // onPress={dispatch(startTimer())}
            >
                <Text>start</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

export default TimerScreen