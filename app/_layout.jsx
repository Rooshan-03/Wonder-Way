// app/_layout.jsx
import { store } from '@/constants/Redux/store';
import '../global.css';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { Provider } from 'react-redux';

export default function Layout() {
  return (
    <Provider store={store}>
    <View className="flex-1 bg-white">
      <Stack screenOptions={{
        headerShown:false,
        animation:'fade'
      }} />
    </View>
    </Provider>
  );
}
