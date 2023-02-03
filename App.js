import TimerSetupScreen from './screens/TimerSetupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimerScreen from './screens/TimerScreen';
//git push -u origin master

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='timerScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='timerSetupScreen' component={TimerSetupScreen} />
        <Stack.Screen
          name='timerScreen'
          component={TimerScreen}
        />
        {/* options={{ presentation: 'modal', headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
