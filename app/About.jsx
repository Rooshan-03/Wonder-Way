import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function About() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-green-200">
      <Text className="text-2xl font-bold text-green-900 mb-4">
        This is the About Page!
      </Text>

      <Pressable
        className="px-4 py-2 bg-green-500 rounded"
        onPress={() => router.back()}
      >
        <Text className="text-white font-semibold">Go Back</Text>
      </Pressable>
    </View>
  );
}
