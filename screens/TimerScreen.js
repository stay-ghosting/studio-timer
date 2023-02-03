import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import AndroidSafeView from '../components/AndroidSafeView';
import { selectHMS, selectSeconds } from '../slices/timeElapsedSlice'
import { SafeAreaView } from 'react-native-safe-area-context';
import Timer from '../components/Timer';
import Timer2 from '../components/Timer2';
import { useSelector } from 'react-redux';



const TimerScreen = () => {
    // const [timer, setTimer] = useState(new Timer())
    const [time, setTime] = useState(0)

    const pause = useRef(null);
    const resume = useRef(null);

    const hms = useSelector(selectHMS);


    return (
        <SafeAreaView style={AndroidSafeView.AndroidSafeArea} className='flex-1'>
            <Timer
                pause={pause}
                resume={resume} />
            <Text>{`${hms.h}:${hms.m}:${hms.s}`}</Text>


            <TouchableOpacity
                onPress={pause.current}>
                <Text>pause</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={resume.current}>
                <Text>play</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

export default TimerScreen