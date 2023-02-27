import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ title, onPress = () => { }, ...props }) => {
    return (
        <TouchableOpacity
            {...props}
            activeOpacity={0.8}
            className='bg-violet-500 items-center w-40 m-auto py-4 rounded-lg'
            onPress={onPress}>
            <Text
                className='text-white font-bold'>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button