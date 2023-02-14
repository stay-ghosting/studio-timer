import TimerSetupScreen from './screens/TimerSetupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimerScreen from './screens/TimerScreen';
import { SecondsToHMS } from './components/HMS';
import MenuScreen from './screens/MenuScreen';
import { SessionsProvider } from './components/SessionsProvider';
import { useEffect } from 'react';
//git push -u origin master
// handle if ran for 0 seconds
// change to switch navigator
// create get set for context linked to loca storage
// give the option to reset data if not working in local storage
// create a validation function to make sure local sessions is in the correct form

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <SessionsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='menuScreen' screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen
          name='timerSetupScreen'
          component={TimerSetupScreen}
          options={{ presentation: 'modal', headerShown: false }} /> */}
          <Stack.Screen
            name='timerScreen'
            component={TimerScreen}
            initialParams={{
              sessionName: "",
              pricePerInterval: 0,
              intervalHMS: SecondsToHMS(0),
            }} />
          <Stack.Screen
            name='menuScreen'
            component={MenuScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionsProvider>
  );
}
