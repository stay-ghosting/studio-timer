import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import ExtraSafeView from '../components/ExtraSafeView'

const TimerSetupScreen = () => {
    return (
        <ExtraSafeView>
            <Text className='text-xl'>TimerSetupScreen</Text>
        </ExtraSafeView>
    )
}

export default TimerSetupScreen