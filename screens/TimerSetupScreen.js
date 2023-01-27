import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SelectTimeList from '../components/SelectTimeList'
import AndroidSafeView from '../components/AndroidSafeView';
import { updateSession } from '../slices/currentSessionSlice'

const TimerSetupScreen = () => {
    const [hours, setHours] = useState(1);
    const [minutes, setMinutes] = useState(0);

    const [name, setName] = useState('Timer 1');
    const [price, setPrice] = useState(10);

    const [errorMessage, setErrorMessage] = useState('');

    const validateInput = () => {
        // populated by erreoe messages if there is any
        let newErrorMessage = ''
        // changes to false if error occurs
        let isValid = true;

        // if price not entered
        if (price === '') {
            // show error message
            newErrorMessage += '\nPlease enter a valid price per interval';
            isValid = false;

        }
        // if price is 0
        else if (price == 0) {
            // show error message
            newErrorMessage += '\nPlease enter a valid price per intervall';
            isValid = false;

        }
        // if price entered is not a number
        else if (isNaN(price)) {
            // show error message
            newErrorMessage += '\nPlease enter a valid price per interval';
            isValid = false;
        }

        if (hours === 0 && minutes === 0) {
            // show error message
            newErrorMessage += '\nPlease select a valid time interval';
            isValid = false;
        }

        // re for string only containing letters and numbers
        const alphaNumeric = /^[\w\s]+$/;

        console.log(alphaNumeric.test(name));
        // if name not entered
        if (name === '') {
            // show error message
            newErrorMessage += '\nPlease enter a valid name';
            isValid = false;

        }
        // if it dosnt only contain letters and numbers
        else if (!alphaNumeric.test(name)) {
            // show error message
            newErrorMessage += '\nname may only contain letters and numbers';
            isValid = false;
        }

        setErrorMessage(newErrorMessage.trim())

        // if invalid stop function
        if (!isValid) {
            return;
        }

        priceNumber = Number(price);
        const totalSeconds = (hours * 3600) + (minutes * 60);
    }

    return (

        <SafeAreaView style={AndroidSafeView.AndroidSafeArea} className='flex-1'>
            {/* title */}
            <Text className='text-4xl font-bold text-center pt-5'>Setup Timer</Text>
            <Text className='text-red-500 text-center h-16'>{errorMessage}</Text>

            <View className='pt-16 flex-1'>
                {/* form */}
                <View className='px-14'>
                    {/* name field */}
                    <Text>Name</Text>
                    <TextInput
                        className='border-b border-gray-700 mb-4 mt-1 text-xl p-1'
                        onChangeText={(val) => { setName(val); console.log(name); }}
                        defaultValue={name}
                        // placeholder={name.toString()}
                        keyboardType='default'
                    />

                    {/* price field */}
                    <Text>Price Per Interval</Text>
                    <View className='border-b border-gray-700 mb-4 mt-1 flex-row items-center'>
                        <Text className='flex-row text-lg'> £ </Text>
                        <TextInput
                            className='flex-1 text-xl p-1'
                            keyboardType='decimal-pad'
                            defaultValue={price}
                            placeholder={price.toString()}
                            onChangeText={(val) => { setPrice(val); console.log(price); }}
                        />
                    </View>

                    {/* interval field */}
                    <Text>Interval</Text>
                    <View className='flex-row items-start'>
                        {/* hours */}
                        <SelectTimeList
                            initialValue={hours}
                            setSelected={(val) => { setHours(val); console.log(hours); }}
                            maxValue={24}
                            suffix='h' />
                        {/* minutes */}
                        <SelectTimeList
                            initialValue={minutes}
                            setSelected={(val) => { setMinutes(val); console.log(minutes) }}
                            maxValue={60}
                            suffix='m' />
                    </View>
                </View>
            </View>
            <View className='items-center pb-24'>
                <TouchableOpacity onPress={validateInput} className='bg-black w-52 rounded-xl'>
                    <Text className='text-gray-100 py-5 text-center uppercase'>Start Timer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default TimerSetupScreen