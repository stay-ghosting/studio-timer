import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

const DismissKeyboardView = ({ children }) => (
    <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default DismissKeyboardView