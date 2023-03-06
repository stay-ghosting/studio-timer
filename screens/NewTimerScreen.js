
import { View, Text, Keyboard, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import Slider from '@react-native-community/slider';
import DismissKeyboardView from '../components/DismissKeyboardView'
import CheckBox from '../components/CheckBox'
import { ScrollView } from 'react-native'
import { HMSToSeconds, SecondsToHMS, HMSFormatted } from '../utils/HMS'

const NewTimerScreen = () => {
    const navigation = useNavigation();
    const [inputs, setInputs] = useState({
        sessionName: '',
        pricePerInterval: '',
        intervalMinutes: 0,
        intervalHours: 0,
        isRounded: false,
        roundPercent: 0,
    });

    const [errors, setErrors] = useState({})
    const [intervalError, setIntervalError] = useState('')


    const intervalSeconds = HMSToSeconds({ h: inputs.intervalHours, m: inputs.intervalMinutes, s: 0 })
    const secondsToRoundTo = Math.ceil((inputs.roundPercent / 100) * intervalSeconds);
    const StringHMSRoundTo = HMSFormatted(SecondsToHMS(secondsToRoundTo));

    const validate = () => {
        Keyboard.dismiss();

        let isValid = true;

        // validate session name
        if (inputs.sessionName === '') {
            handleError('please enter a value', 'sessionName');
            isValid = false;
        }
        else {
            const alphaNumeric = /^[\w\s]+$/;

            if (!alphaNumeric.test(inputs.sessionName)) {
                handleError('session name can only contain numbers leters and underscores', 'sessionName');
                isValid = false;
            }
        }


        // validate price per interval
        if (inputs.pricePerInterval === '') {
            handleError('please enter a value', 'pricePerInterval')
            isValid = false;
        }
        else {
            const isFloat = /^\d*(\.\d+)?$/;
            // if not a correct float ...
            if (!(isFloat.test(inputs.pricePerInterval.trim()))) {
                handleError('please enter a valid number', 'pricePerInterval')
                isValid = false;
            }
            else {
                var numberPriceperInterval = Number(inputs.pricePerInterval);

                if (numberPriceperInterval === 0) {
                    handleError('price cannot be 0', 'pricePerInterval')
                    isValid = false;
                }
            }
        }

        if (inputs.intervalHours === 0 && inputs.intervalMinutes === 0) {
            setIntervalError('Please select a valid interval')
            isValid = false;
        }

        // stop script if invalid
        if (!isValid) {
            return
        }

        // undo errors
        setErrors({});
        setIntervalError('')

        const sessionDetails = {
            sessionName: inputs.sessionName,
            pricePerInterval: numberPriceperInterval,
            isRounded: inputs.isRounded,
            roundPercent: inputs.roundPercent,
            intervalHMS: {
                h: inputs.intervalHours,
                m: inputs.intervalMinutes,
                s: 0,
            },
        }
        navigation.navigate('timerScreen', sessionDetails)
    };

    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    }

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }))
    }
    return (
        // <DismissKeyboardView>
        <SafeAreaView className='flex-1 px-4'>
            {/* title */}
            <Text className='text-4xl text-center py-5'>New Timer</Text>
            <ScrollView keyboardDismissMode='on-drag' className='flex-1'>
                {/* session name */}
                <Input
                    onChangeText={(text) => { handleOnChange(text, 'sessionName') }}
                    label='Session Name'
                    placeholder='Enter a name for your session'
                    iconName='file-document-edit-outline'
                    onFocus={() => { handleError(null, 'sessionName') }}
                    isMaterialIcon={true}
                    error={errors.sessionName} />
                {/* interval */}
                <Input
                    onChangeText={(text) => { handleOnChange(text, 'pricePerInterval') }}
                    keyboardType='numeric'
                    label='Price Per Interval'
                    placeholder='Enter price per interval'
                    iconName='pound'
                    onFocus={() => { handleError(null, 'pricePerInterval') }}
                    isMaterialIcon={false}
                    error={errors.pricePerInterval} />
                <View className=''>
                    <Text className='text-sm text-slate-800 pt-2 '>Interval: {inputs.intervalHours}h{inputs.intervalMinutes}m</Text>
                    <View className={`${intervalError ? 'border-red-500 border' : ''} rounded-lg px-3 py-4 bg-slate-200 mt-2`}>
                        <Text className='text-sm text-slate-800 pb-2'>Hours</Text>
                        <Slider
                            style={{ width: '100%', height: 20 }}
                            minimumValue={0}
                            maximumValue={24}
                            step={1}
                            thumbTintColor='#8B5CF6'
                            minimumTrackTintColor="#8B5CF6"
                            maximumTrackTintColor="#C4B5FD"
                            tapToSeek
                            onValueChange={(value) => {
                                Keyboard.dismiss();
                                setInputs({ ...inputs, intervalHours: value });
                                setIntervalError('');
                            }} />
                        <Text className='text-sm text-slate-800 py-2'>Minutes</Text>
                        <Slider
                            style={{ width: '100%', height: 20 }}
                            minimumValue={0}
                            maximumValue={59}
                            step={1}
                            thumbTintColor='#8B5CF6'
                            minimumTrackTintColor="#8B5CF6"
                            maximumTrackTintColor="#C4B5FD"
                            tapToSeek
                            onValueChange={(value) => {
                                Keyboard.dismiss();
                                setInputs({ ...inputs, intervalMinutes: value });
                                setIntervalError('');
                            }} />
                        <CheckBox
                            initialValue={inputs.isRounded}
                            className='mt-6'
                            label='Enable Rounding'
                            onValueChanged={(value) => setInputs({ ...inputs, isRounded: value })} />

                        {
                            inputs.isRounded &&
                            <View className='rounded-lg mt-2 space-y-2'>
                                <Text className={`text-sm text-slate-800`}>
                                    Round up after {StringHMSRoundTo}
                                </Text>
                                <Slider
                                    style={{ width: '100%', height: 20 }}
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={1}
                                    thumbTintColor='#8B5CF6'
                                    minimumTrackTintColor="#8B5CF6"
                                    maximumTrackTintColor="#C4B5FD"
                                    tapToSeek
                                    onValueChange={(value) => {
                                        Keyboard.dismiss();
                                        setInputs({ ...inputs, roundPercent: value });
                                    }} />
                            </View>
                        }
                    </View>
                    <Text className='text-red-500 text-xs mt-2'>{intervalError}</Text>

                    {/* rounded */}

                </View>

                <View className='flex-1 justify-end'></View>
            </ ScrollView>
            {/* start timer button */}
            <DismissKeyboardView>
                <Button
                    className='my-2'
                    title='Start Timer'
                    onPress={validate} />
            </DismissKeyboardView>
        </SafeAreaView >
        // </DismissKeyboardView>
    )
}

export default NewTimerScreen