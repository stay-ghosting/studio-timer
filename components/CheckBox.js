import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'

const CheckBox = ({ onValueChanged, label, initialValue, ...props }) => {
    const [checked, setChecked] = useState(initialValue);
    return (
        <TouchableOpacity
            {...props}
            activeOpacity={0.8}
            onPress={() => {
                onValueChanged(!checked);
                setChecked(!checked);
            }}
            className='flex-row space-x-2 items-center'>
            <MaterialCommunityIcons
                size={25}
                name={checked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'} />
            <Text className='text-sm text-slate-800'>{label}</Text>
        </TouchableOpacity>
    )
}

export default CheckBox