import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryScreen from './HistoryScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NewTimerScreen from './NewTimerScreen';

const Tab = createBottomTabNavigator();

const MenuScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,

                tabBarIcon: ({ focused, size, colour }) => {
                    let iconName;

                    if (route.name === 'timerSetupScreen') {
                        iconName = 'timer';
                    }
                    else if (route.name === 'NewTimer') {
                        iconName = 'timer';
                    }
                    else if (route.name === 'History') {
                        iconName = 'history';
                    }

                    if (focused) {
                        colour = '#8B5CF6'
                    }

                    return <MaterialIcons name={iconName} size={size} color={colour} />
                }
            })}>
            <Tab.Screen name='NewTimer' component={NewTimerScreen} />
            <Tab.Screen name='History' component={HistoryScreen} />
        </Tab.Navigator>
    )
}

export default MenuScreen;