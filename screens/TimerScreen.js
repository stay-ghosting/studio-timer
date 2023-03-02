import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { HMSToSeconds, SecondsToHMS } from '../utils/HMS';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import Button from '../components/Button';
import { useSessions } from '../components/SessionsProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';


const TimerScreen = ({ route }) => {
    const { pricePerInterval, intervalHMS, sessionName, isRounded, roundPercent } = route.params;

    const navigation = useNavigation();

    const DEBUG_FAST_MODE = false;

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
    const secondsIntoInterval = seconds % HMSToSeconds(intervalHMS);
    const percentToNextInterval = (secondsIntoInterval / HMSToSeconds(intervalHMS)) * 100;
    if (percentToNextInterval > roundPercent) {
        var currentPrice = (intervalsPassed * pricePerInterval) + pricePerInterval;
    } else {
        var currentPrice = (intervalsPassed * pricePerInterval);
    }


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
        navigation.addListener('beforeRemove', (e) => {
            // Prevent leaving the screen
            e.preventDefault();
            // ask if sure
            showConfirmCancel();
        })
    }, [navigation]);

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
                        if (DEBUG_FAST_MODE) {
                            setSeconds(seconds => seconds + 1241);
                        } else {
                            setSeconds(seconds => seconds + 1);

                        }
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

    const showConfirmCancel = () => {

        const confirm = () => {
            navigation.navigate('NewTimer');
        }

        return Alert.alert(
            "Confirm stop Timer",
            `
Are you sure you want to end the timer?
All progress will be lost!`,
            [
                {
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => confirm(),
                },
            ]
        );
    }

    const showConfirmFinish = () => {

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
            fromTimer: true,
            index: 0,
        };

        const confirm = () => {
            addSession(session);
            navigation.navigate('timerInfoScreen', session);
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
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => confirm(),
                },
            ]
        );
    };



    return (
        <SafeAreaView className='flex-1 px-5 items-center'>
            <View className='flex-1 items-center' >
                {/* session name */}
                {isSetUp &&
                    <>
                        <View className='flex-row items-center'>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={showConfirmCancel}
                                className='flex-1 justify-center'>
                                <AntDesign name='left' size={25} />
                            </TouchableOpacity>
                            <Text className='text-4xl text-center py-5'>Studio Timer</Text>
                            <View className='flex-1' />
                        </View>
                        <Text className='pb-4 text-lg text-slate-600'>{sessionName}</Text>
                    </>
                }
            </View>
            <View className='justify-center items-center'>

                <TouchableOpacity
                    activeOpacity={0.8}
                    className='py-4 items-center bg-slate-200 p-4 rounded-lg border border-violet-500'
                    onPress={() => {
                        if (isSetUp) {
                            setIsPaused(!isPaused)
                        } else {
                            navigation.navigate('NewTimer')
                        }
                    }}>
                    {isSetUp && <Text className='pb-4 text-lg text-slate-600'>Current Price £{currentPrice}</Text>}
                    {/* time */}
                    <Text className='text-6xl text-violet-500 font-bold '>
                        {`${timeElapsedHMS.h.toString().padStart(2, '0')}:${timeElapsedHMS.m.toString().padStart(2, '0')}:${timeElapsedHMS.s.toString().padStart(2, '0')}`}
                    </Text>
                    {/* progress bar */}
                    {isSetUp && <Progress.Bar progress={progressToInteraval} width={200} color='#8B5CF6' />}
                    {
                        isSetUp ?
                            <Text className='text-lg font-bold text-violet-500'>Tap To {isPaused ? (hasBeenRan ? 'Resume' : 'Start') : ('Pause')}</Text> :
                            <Text>tap to set up timer</Text>
                    }
                </TouchableOpacity>
            </View>
            <View className='flex-1 justify-end'>
                {isSetUp &&
                    <View className='flex-row space-x-2'>
                        {/* done button */}
                        <Button
                            title='Finish Session'
                            className='px-4 py-2 mb-10'
                            onPress={() => { showConfirmFinish() }} />
                    </View>}
            </View>
        </SafeAreaView >

    )
}

export default TimerScreen