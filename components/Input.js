import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FoundationIcon from 'react-native-vector-icons/Foundation'

const Input = ({
    label,
    iconName,
    isMaterialIcon,
    error,
    placeholder,
    onFocus = () => { },
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputComponent = useRef(null);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => { inputComponent.current.focus() }}>
            <Text className='text-sm text-slate-600 py-2'>{label}</Text>
            <View className={`h-14 flex-row px-4  rounded-lg items-center space-x-2 bg-slate-200
                            ${error && 'border border-red-500'} 
                            ${isFocused && 'border border-slate-400'}`}>
                <View className='w-6 items-center'>
                    {isMaterialIcon ?
                        <MaterialIcon name={iconName} size={24} color='#64748B' /> :
                        <FoundationIcon name={iconName} size={24} color='#64748B' />
                    }
                </View>

                <TextInput
                    {...props}
                    placeholder={placeholder}
                    autoCorrect={false}
                    ref={inputComponent}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }} />
            </View>
            <Text className='text-red-500 text-xs mt-2'>{error}</Text>
        </TouchableOpacity>
    )
}

export default Input