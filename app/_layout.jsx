// app/_layout.jsx
import '../global.css';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View className="flex-1 bg-white">
      <Stack />
    </View>
  );
}
