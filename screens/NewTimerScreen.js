import { View, Text, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import Slider from '@react-native-community/slider';
import DismissKeyboardView from '../components/DismissKeyboardView'

const NewTimerScreen = () => {
    const navigation = useNavigation();
    const [inputs, setInputs] = useState({
        sessionName: '',
        pricePerInterval: '',
        intervalMinutes: 0,
        intervalHours: 0,
    });

    const [errors, setErrors] = useState({})
    const [intervalError, setIntervalError] = useState('')

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
            console.log(inputs.sessionName);

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
            // console.log(inputs.pricePerInterval);
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
        <DismissKeyboardView>
            <SafeAreaView className='px-14 flex-1'>
                {/* title */}
                <Text className='text-4xl text-center py-5'>New Timer</Text>
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
                    label='Price'
                    placeholder='Enter price per interval'
                    iconName='pound'
                    onFocus={() => { handleError(null, 'pricePerInterval') }}
                    isMaterialIcon={false}
                    error={errors.pricePerInterval} />
                <View className='border-t border-slate-300  pt-3'>
                    <View className={`${intervalError ? 'border-red-500' : ''} border px-3 py-4 bg-slate-200 mt-2`}>
                        <Text className='text-lg text-slate-600 pb-4'>Interval: {inputs.intervalHours}h{inputs.intervalMinutes}m</Text>
                        <Text className='text-sm text-slate-600 pb-2'>Hours</Text>
                        <Slider
                            style={{ width: '100%', height: 20 }}
                            minimumValue={0}
                            maximumValue={24}
                            step={1}
                            thumbTintColor='#8B5CF6'
                            minimumTrackTintColor="#8B5CF6"
                            maximumTrackTintColor="#C4B5FD"
                            onValueChange={(value) => {
                                setInputs({ ...inputs, intervalHours: value });
                                setIntervalError('');
                            }} />
                        <Text className='text-sm text-slate-600 py-2'>Minutes</Text>
                        <Slider
                            style={{ width: '100%', height: 20 }}
                            minimumValue={0}
                            maximumValue={59}
                            step={1}
                            thumbTintColor='#8B5CF6'
                            minimumTrackTintColor="#8B5CF6"
                            maximumTrackTintColor="#C4B5FD"
                            onValueChange={(value) => {
                                setInputs({ ...inputs, intervalMinutes: value });
                                setIntervalError('');
                            }} />
                    </View>
                    <Text className='text-red-500 text-xs mt-2'>{intervalError}</Text>

                </View>

                <View className='flex-1 justify-end'>
                </View>
                {/* start timer button */}
                <Button
                    className='mb-7'
                    title='Start Timer'
                    onPress={validate} />
            </SafeAreaView >
        </DismissKeyboardView>
    )
}

export default NewTimerScreen