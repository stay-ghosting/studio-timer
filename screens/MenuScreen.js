import { View, Text, KeyboardAvoidingView } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryScreen from './HistoryScreen';
import TimerSetupScreen from './TimerSetupScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NewTimerScreen from './NewTimerScreen';
import { addSessionLocal, getSessionsLocal, resetSessionsLocal } from '../components/localStorage';
import { SessionsContext } from '../context/SessionsContext';

const Tab = createBottomTabNavigator();

const MenuScreen = () => {

    const DEBUG_RESET_MEMORY = false;
    const [sessions, setSessions] = useState([])

    /** sets sessions state ready to use in the context */
    // const loadData = async () => {
    //     setSessions(await getSessionsLocal());
    // }

    useEffect(() => {
        (async () => {
            if (DEBUG_RESET_MEMORY) {
                await resetSessionsLocal();
            }
            // sets sessions state ready to use in the context
            setSessions(await getSessionsLocal());
        })();
    }, [sessions])


    return (
        <SessionsContext.Provider value={sessions}>
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
                <Tab.Screen
                    name='History'
                    component={HistoryScreen} />
            </Tab.Navigator>
        </SessionsContext.Provider>
    )
}

export default MenuScreen;