import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import TimerSetupScreen from './screens/TimerSetupScreen';

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <TimerSetupScreen />
    </View>
  );
}
