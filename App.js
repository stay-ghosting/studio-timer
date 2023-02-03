import TimerSetupScreen from './screens/TimerSetupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimerScreen from './screens/TimerScreen';
import { SecondsToHMS } from './components/HMS';
//git push -u origin master

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='timerScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='timerSetupScreen'
          component={TimerSetupScreen}
          options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen
          name='timerScreen'
          component={TimerScreen}
          initialParams={{
            sessionName: "",
            pricePerInterval: 0,
            intervalHMS: SecondsToHMS(0),
            isSetUp: false,
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
