import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { APP_NAME } from '@/constants/config';
import { clearStatus, setError, setLoading } from '@/constants/Redux/ParentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ValidateRegistration } from '@/constants/services/Controller';
import { registerUser } from '@/constants/services/apiService';

const Register = () => {
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector((state) => state.userData)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                dispatch(clearStatus());
                router.push('/Login');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [success, dispatch]);


    const handleRegistration = async () => {
        try {
            dispatch(setLoading(true))
            if (ValidateRegistration(name, email, password, confirmPassword, dispatch)) {
                const userData = {
                    name: name,
                    email: email,
                    password: password
                }
                const response = await registerUser(userData, dispatch)
                console.log(response)
                if (!response) {
                    dispatch(setError('We could Not Proceed At This Moment, Try Again'))
                    return
                }
                router.push('/Login')
            }
        } catch (error) {
            dispatch(setError('Error Occurred, Try Again Later'))
            console.log(error)
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-appBackground">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <StatusBar barStyle={'dark-content'} className='bg-appBackground' />

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6" showsVerticalScrollIndicator={false}>

                    <View className="mt-20">
                        <Text className="text-3xl font-bold text-gray-900">Join {APP_NAME}</Text>
                        <Text className="text-gray-500 mt-2 text-sm leading-5">
                            Join now and keep track of daily routine for your growing little one.
                        </Text>
                    </View>

                    <View className="mt-10">
                        <Text className="text-[13px] font-semibold mb-2 text-gray-700">Full Name*</Text>
                        <TextInput
                            placeholder="Ibrahim"
                            placeholderTextColor="#9ca3af"
                            value={name}
                            onChangeText={setName}
                            className="bg-[#F5F5F5] border border-gray-100 rounded-xl p-4 mb-5 text-gray-800"
                        />

                        <Text className="text-[13px] font-semibold mb-2 text-gray-700">Email address*</Text>
                        <TextInput
                            placeholder="ibrahim@gmail.com"
                            placeholderTextColor="#9ca3af"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            className="bg-[#F5F5F5] border border-gray-100 rounded-xl p-4 mb-5 text-gray-800"
                        />

                        <Text className="text-[13px] font-semibold mb-2 text-gray-700">Password*</Text>
                        <View className="flex-row items-center bg-[#F5F5F5] border border-gray-100 rounded-xl px-4 mb-5">
                            <TextInput
                                placeholder="********"
                                placeholderTextColor="#9ca3af"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                autoCapitalize={'none'}
                                className="flex-1 py-4 text-gray-800"
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#9ca3af"
                                />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-[13px] font-semibold mb-2 text-gray-700">Confirm Password*</Text>
                        <View className="flex-row items-center bg-[#F5F5F5] border border-gray-100 rounded-xl px-4">
                            <TextInput
                                placeholder="********"
                                placeholderTextColor="#9ca3af"
                                autoCapitalize={'none'}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                className="flex-1 py-4 text-gray-800"
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons
                                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#9ca3af"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        className="bg-[#20C9C2] py-4 rounded-full mt-8 items-center shadow-sm active:opacity-80"
                        onPress={handleRegistration}
                        disabled={loading}
                    >
                        {
                            loading ? (
                                <ActivityIndicator size={'small'} color={'#fff'} />
                            ) : (
                                <Text className="text-white font-bold text-lg">Create Account</Text>
                            )
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="mt-auto mb-8 py-4 self-center"
                        onPress={() => router.push('/Login')}
                    >
                        <Text className="text-gray-500 text-sm">
                            Already have an account? <Text className="font-bold text-black underline">Sign in</Text>
                        </Text>
                    </TouchableOpacity>

                </ScrollView>

                {/* Success Modal - Moved outside ScrollView */}
                {success && (
                    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center z-50">
                        <View className="bg-white w-5/6 rounded-2xl p-6 items-center shadow-xl">
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

                {/* Error Modal - Moved outside ScrollView */}
                {error && (
                    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center z-50">
                        <View className="bg-white w-5/6 rounded-2xl p-6 items-center shadow-xl">
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Register;