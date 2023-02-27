import { View, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import React from 'react'

const DismissKeyboardView = ({ children }) => (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);

export default DismissKeyboardView