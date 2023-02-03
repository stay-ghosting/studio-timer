import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";


const Timer2 = ({ updateTime }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(0);

    React.useEffect(() => {
        let interval = null;

        if (isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
                updateTime(time);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isPaused]);

    const toggleTimer = () => {
        setIsPaused(!isPaused);
    };

    const resetTimer = () => {
        setIsPaused(true);
        setTime(0);
    };

    return (
        <>
            <Text>{time}</Text>
            <TouchableOpacity
                onPress={toggleTimer}>
                <Text>toggle timer</Text>
            </TouchableOpacity>
        </>
    );
}

export default Timer2;
