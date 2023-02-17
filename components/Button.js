import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ title, onPress = () => { }, ...props }) => {
    return (
        <TouchableOpacity
            {...props}
            activeOpacity={0.8}
            className='bg-violet-500 items-center py-5'
            onPress={onPress}>
            <Text
                className='text-white font-bold'>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button