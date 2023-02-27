import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimerScreen from './screens/TimerScreen';
import { SecondsToHMS } from './utils/HMS';
import MenuScreen from './screens/MenuScreen';
import { SessionsProvider } from './components/SessionsProvider';
import TimerInfoScreen from './screens/TimerInfoScreen';
//git push -u origin master
// give the option to reset data if not working in local storage
// create a validation function to make sure local sessions is in the correct form
// ad percent to rounding

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <SessionsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='menuScreen' screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name='timerScreen'
            component={TimerScreen}
            initialParams={{
              sessionName: "",
              pricePerInterval: 0,
              intervalHMS: SecondsToHMS(0),
            }} />
          <Stack.Screen
            name='timerInfoScreen'
            component={TimerInfoScreen}
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
