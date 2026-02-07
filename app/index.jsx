import React, { useState } from 'react';
import { Text, View, Image, Platform } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import { cssInterop } from "nativewind";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';

cssInterop(LottieView, { className: "style" });

const slides = [
  {
    key: 'one',
    title: 'Welcome to NovaNop',
    text: 'Your Parenting Partner',
    image: require('../assets/onboarding.png'),
    backgroundColor: 'bg-[#59b2ab]',
  },
  {
    key: 'two',
    title: 'Stay Organized',
    image: require('../assets/father-reading-story-book-for-child.png'),
    isProcessScreen: true,
    text: 'Categorize your work and never miss a deadline again.',
    backgroundColor: 'bg-[#febe29]',
  },
  {
    key: 'three',
    title: 'Get Started',
    text: "You're all set! Let's dive into your productivity journey.",
    animation: require('../assets/Man-Holding-Note.json'),
    backgroundColor: 'bg-[#22bcb5]',
  }
];

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);
  const insets = useSafeAreaInsets();
  const onDone = () => setShowRealApp(true);

  const renderItem = ({ item }) => {
    if (item.isProcessScreen) {
      return (
        <SafeAreaView className={`flex-1 items-center justify-center px-6 ${item.backgroundColor}`}>
          <Text className="text-3xl font-bold text-white mb-10">{item.title}</Text>
          <Image source={item.image} className="w-80 h-80 my-8" resizeMode="contain" />
          <View className='flex-row justify-center items-center mt-4'>
            {/* Step 1: Register */}
            <View className='items-center mx-2'>
              <View className='w-16 h-16 items-center justify-center rounded-full bg-[#2D3436] shadow-sm'>
                <Ionicons name="person-add-outline" size={24} color="#fff" />
              </View>
              <Text className="text-[12px] text-[#2D3436] font-extrabold mt-2">Register</Text>
            </View>

            {/* Step 2: Add Kids */}
            <View className='items-center mx-2'>
              <View className='w-16 h-16 items-center justify-center rounded-full bg-white shadow-sm'>
                <Ionicons name="body-outline" size={24} color="#2D3436" />
              </View>
              <Text className="text-[12px] text-[#2D3436] font-extrabold mt-2">Add Kids</Text>
            </View>

            {/* Step 3: Start */}
            <View className='items-center mx-2'>
              <View className='w-16 h-16 items-center justify-center rounded-full bg-[#2D3436] shadow-sm'>
                <Ionicons name="calendar-outline" size={24} color="#fff" />
              </View>
              <Text className="text-[12px] text-[#2D3436] font-extrabold mt-2">Start</Text>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <View className={`flex-1 items-center justify-center pb-24 ${item.backgroundColor}`}>
        <Text className="text-3xl font-extrabold text-white text-center px-4">{item.title}</Text>
        {item.animation ? (
          <LottieView
            source={item.animation}
            autoPlay
            loop
            className="w-80 h-80 my-8"
          />
        ) : (
          <Image
            source={item.image}
            className="w-80 h-80 my-8"
            resizeMode="contain"
          />
        )}
        <Text className="text-2xl font-semibold text-white/80 text-center px-6">{item.text}</Text>
      </View>
    );
  };

  if (showRealApp) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold">Main  Dashboard</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, paddingBottom: insets.bottom }}>
        <AppIntroSlider
          renderItem={renderItem}
          data={slides}
          showSkipButton={true}
          onDone={onDone}
          onSkip={onDone}
          bottomButton={false}
        />
      </View>
    </SafeAreaProvider>
  );
}