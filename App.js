import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import AndroidSafeView from './components/AndroidSafeView';
import TimerSetupScreen from './screens/TimerSetupScreen';

export default function App() {
  return (
    <SafeAreaView style={AndroidSafeView.AndroidSafeArea} className='flex-1'>
      <StatusBar style="auto" />
      <TimerSetupScreen />
    </SafeAreaView>
  );
}
