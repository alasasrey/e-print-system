import axiosInstance from '@/utils/axiosInstance'; //REMEMBER: USE await axiosInstance.get or .post
import { Ionicons } from '@expo/vector-icons'; // Ensure expo-vectors is installed
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/authStyles";


export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            //change the localhost in the api.js, app.json or .env
            const response = await axiosInstance.post(`/login`, {
                email,
                password,
            });

            const { token, role, user } = response.data;

            //SAVE AUTH DATA
            await AsyncStorage.multiSet([
                ["token", token],
                ["role", role],
                ["userId", String(user.id)],
            ]);

            //ROLE-BASED ROUTING
            if (role === "admin") {
                router.replace("/(tabs)/admin/dashboard");
            } else if (role === "manager") {
                router.replace("/(tabs)/manager/dashboard");
            } else {
                router.replace("/(tabs)/student/home");
            }

            Alert.alert("Success", "Login successful");
        } catch (error) {
            let message = "Unable to connect to server";

            if (error instanceof Error) {
                // Standard JS error
                message = error.message;
            } else if (error && typeof error === 'object' && 'response' in error && (error as any).response?.data?.message) {
                // Check if the error is an Axios error (or at least has a response object)
                message = (error as any).response.data.message;
            }

            Alert.alert("Login Failed", message);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {/* Header Icon & Title */}
                <View style={styles.headerContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="print-outline" size={40} color="white" />
                    </View>
                    <Text style={styles.title}>E-Print System</Text>
                    <Text style={styles.subtitle}>Centralized Document Submission & Job Management</Text>
                </View>

                {/* Toggle Switch */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
                        <Text style={styles.toggleTextActive}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => router.push("/register")} // Link to your register route
                    >
                        <Text style={styles.toggleText}>Register</Text>
                    </TouchableOpacity>
                </View>

                {/* Form Fields */}
                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="email@example.com"
                        style={styles.input}
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="••••••••"
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    );
}