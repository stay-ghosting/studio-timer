import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { setElapsedHMS, selectHMS } from '../slices/timeElapsedSlice'
import { useDispatch, useSelector } from 'react-redux'

const secondsToHMS = (seconds) => {
    // create date instance 
    const date = new Date(null);
    // specify seconds
    date.setSeconds(seconds);
    // get the hms values
    const h = Number(date.toISOString().slice(11, 13));
    const m = Number(date.toISOString().slice(14, 16));
    const s = Number(date.toISOString().slice(17, 19));
    // return the hms values
    return { h, m, s, }
}

const Timer = (props) => {
    props.resume.current = () => resumeTimer();
    props.pause.current = () => pauseTimer();

    const dispatch = useDispatch();
    const hmsx = useSelector(selectHMS);


    const [isPaused, setIsPaused] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const hms = secondsToHMS(seconds);

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
        dispatch(setElapsedHMS(secondsToHMS(seconds)));
    }, [seconds])
}

export default Timer