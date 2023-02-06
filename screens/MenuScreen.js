import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const MenuScreen = () => {
    return (
        <SafeAreaView className='px-4 items-center'>
            <Text className='text-4xl pt-5'>Studio Timer</Text>
            <Text className='text-xl pt-5'>history</Text>
        </SafeAreaView>
    )
}

export default MenuScreen