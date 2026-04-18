import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ValidateLogin } from '@/constants/services/Controller';
import { useDispatch, useSelector } from 'react-redux';
import { clearStatus, setError, setUserData } from '../src/constants/Redux/ParentSlice';
import { LoginUser } from '@/constants/services/apiService';

const LoginScreen = () => {
  const { loading, error, success } = useSelector((state) => state.userData)
  const dispatch = useDispatch()


  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Auto redirect when success is true
  useEffect(() => {
    if (success) {
      // Clear success status after showing message for 2 seconds
      const timer = setTimeout(() => {
        dispatch(clearStatus());
        router.push('/Home');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const HandleLogin = async () => {
    try {
      if (ValidateLogin(email, password, dispatch)) {
        const userData = {
          email: email,
          password: password
        }
        const response = await LoginUser(userData, dispatch)
        console.log(response)
        if (!response) {
          dispatch(setError('We could Not Proceed At This Moment, Try Again'))
          return
        }
        dispatch(setUserData(response))
        router.push('/Home')
      }
    } catch (error) {
      dispatch(setError('Error Occurred, Try Again Later'))
      console.log(error)
    }
  }


  return (
    <SafeAreaView className="flex-1 bg-[#F8FEFE]">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-6">
        <StatusBar barStyle={'dark-content'} className='bg-[#F8FEFE]' />

        <View className="mt-32">
          <Text className="text-3xl font-bold text-gray-900">Welcome Back!</Text>
          <Text className="text-gray-500 mt-2 text-sm leading-5">
            Sign in now and keep track of daily routine for your growing little one.
          </Text>
        </View>

        <View className="mt-10">
          <Text className="text-[13px] font-semibold mb-2 text-gray-700">Email address*</Text>
          <TextInput
            placeholder="abc@gmail.com"
            placeholderTextColor="#9ca3af"
            autoCapitalize={'none'}
            value={email}
            onChangeText={setEmail}
            className="bg-[#F5F5F5] border border-gray-100 rounded-xl p-4 mb-5 text-gray-800"
          />

          <Text className="text-[13px] font-semibold mb-2 text-gray-700">Password*</Text>
          <View className="flex-row items-center bg-[#F5F5F5] border border-gray-100 rounded-xl px-4">
            <TextInput
              placeholder="*********"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              autoCapitalize={'none'}
              secureTextEntry={!showPassword}
              className="flex-1 py-4 text-gray-800"
            />
            <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#9ca3af" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="items-end mt-3">
            <Text className="text-xs font-bold text-gray-900">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {success && (
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center z-50 px-10">
            <View className="bg-white w-full rounded-2xl p-6 items-center shadow-xl">
              <View className="bg-green-100 p-3 rounded-full mb-4">
                <Ionicons name="checkmark-circle" size={40} color="#10b981" />
              </View>

              <Text className="text-xl font-bold text-gray-900 mb-2">Success!</Text>
              <Text className="text-gray-500 text-center mb-2 leading-5">
                Login successful!
              </Text>
              <Text className="text-gray-400 text-sm">
                Redirecting to home...
              </Text>
            </View>
          </View>
        )}

        {/* Error Modal */}
        {error && (
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center z-50 px-10">
            <View className="bg-white w-full rounded-2xl p-6 items-center shadow-xl">
              <View className="bg-red-100 p-3 rounded-full mb-4">
                <Ionicons name="alert-circle" size={40} color="#ef4444" />
              </View>

              <Text className="text-xl font-bold text-gray-900 mb-2">Something went wrong</Text>
              <Text className="text-gray-500 text-center mb-6 leading-5">
                {error}
              </Text>

              <TouchableOpacity
                className="bg-red-500 w-full py-3 rounded-xl items-center"
                onPress={() => dispatch(clearStatus())}
              >
                <Text className="text-white font-bold text-base">Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <TouchableOpacity
          className="bg-[#20C9C2] py-4 rounded-full mt-8 items-center shadow-sm"
          onPress={HandleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size={'small'} color={'#fff'} />
          ) : (
            <Text className="text-white font-bold text-lg">Sign in</Text>
          )}
        </TouchableOpacity>


        <TouchableOpacity className="mt-auto mb-8 self-center" onPress={() => router.push('/Register')}>
          <Text className="text-gray-500 text-sm">
            Don't have an account? <Text className="font-bold text-black underline">Sign up</Text>
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;