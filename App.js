import TimerSetupScreen from './screens/TimerSetupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimerScreen from './screens/TimerScreen';
import { Provider } from 'react-redux';
import store from './store'
//git push -u origin master

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='timerSetupScreen' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='timerSetupScreen' component={TimerSetupScreen} />
          <Stack.Screen name='timerScreen' component={TimerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
