import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { setElapsedHMS, selectHMS } from '../slices/timeElapsedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SecondsToHMS } from './HMS';

const Timer = (props) => {
    props.resume.current = () => resumeTimer();
    props.pause.current = () => pauseTimer();

    const dispatch = useDispatch();
    const hmsx = useSelector(selectHMS);


    const [isPaused, setIsPaused] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const hms = SecondsToHMS(seconds);

    const pauseTimer = () => {
        setIsPaused(true);
    }

    const resumeTimer = () => {
        setIsPaused(false);
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

    // update redux state
    useEffect(() => {
        dispatch(setElapsedHMS(SecondsToHMS(seconds)));
    }, [seconds])
}

export default Timer