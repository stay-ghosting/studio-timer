import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AndroidSafeView from '../components/AndroidSafeView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HMSToSeconds, SecondsToHMS } from '../components/HMS';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import Button from '../components/Button';
import { useSessions } from '../components/SessionsProvider';

const TimerScreen = ({ route }) => {
    const { pricePerInterval, intervalHMS, sessionName } = route.params;

    const navigation = useNavigation();

    const [sessions, addSession, resetSessions] = useSessions();
    const [hasBeenRan, setHasBeenRan] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [startDate, setStartDate] = useState(null);
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
        setStartDate(new Date().toJSON())
    }, [])

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


    useEffect(() => {
        if (seconds > 0) {
            if (!hasBeenRan) {
                setStartTime(new Date().toJSON())
                setHasBeenRan(true);
            }
        }
    }, [seconds])


    const showConfirmFinish = () => {
        // const details = {
        //     timeElapsedHMS: timeElapsedHMS,
        //     currentPrice: currentPrice,
        // }

        const endTime = new Date().toJSON();

        const session = {
            startDate: startDate,
            startTime: startTime,
            endTime: endTime,
            title: sessionName,
            secondsElapsed: seconds,
            secondsInterval: HMSToSeconds(intervalHMS),
            totalPrice: currentPrice,
            pricePerInterval: pricePerInterval,
            notes: "",
        };

        const onPress = () => {

            addSession(session);
            navigation.navigate('menuScreen');
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
                    onPress: () => onPress(),
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
                    activeOpacity={0.8}
                    className='py-4 items-center'
                    onPress={() => {
                        if (isSetUp) {
                            setIsPaused(!isPaused)
                        } else {
                            navigation.navigate('NewTimer')
                        }
                    }}>
                    {isSetUp && <Text className='pb-4 text-lg'>Current Price £{currentPrice}</Text>}
                    {/* time */}
                    <Text className='text-6xl text-violet-500 font-bold '>
                        {`${timeElapsedHMS.h.toString().padStart(2, '0')}:${timeElapsedHMS.m.toString().padStart(2, '0')}:${timeElapsedHMS.s.toString().padStart(2, '0')}`}
                    </Text>
                    {/* progress bar */}
                    {isSetUp && <Progress.Bar progress={progressToInteraval} width={200} color='#8B5CF6' />}
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
                        <Button
                            title='Done'
                            className='px-4 py-2 mb-10'
                            onPress={() => { showConfirmFinish() }} />
                    </>}
            </View>
        </SafeAreaView >

    )
}

export default TimerScreen