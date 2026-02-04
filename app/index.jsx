import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-blue-200">
      <Text className="text-2xl font-bold text-blue-900 mb-4">
        Welcome to Home!
      </Text>

      <Pressable
        className="px-4 py-2 bg-blue-500 rounded"
        onPress={() => router.push('/About')}
      >
        <Text className="text-white font-semibold">Go to About</Text>
      </Pressable>
    </View>
  );
}
