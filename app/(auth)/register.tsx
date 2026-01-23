import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "../../styles/authStyles";

export default function RegisterScreen() {
    const [fullName, setfullName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegistration = async () => {
        if (!fullName || !email || !password) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        try {
            //change the localhost in the api.js, app.json or .env
            const response = await axiosInstance.post(`/register`, {
                fullName,
                studentId,
                email,
                password,
                role: "student", // default role
            });

            const { token, role, user } = response.data;

            //make sure the user id is a string if you want to use the post request
            const userId = user?.id ? String(user.id) : "";

            //Save token and role
            await AsyncStorage.multiSet([
                ["token", token],
                ["role", role],
                ["userId", userId],
            ]);

            //Redirect based on role
            if (role === "admin") router.replace("/(tabs)/admin/dashboard");
            else if (role === "manager") router.replace("/(tabs)/manager/dashboard");
            else router.replace("/(tabs)/student/home");

            Alert.alert("Success", "Registration successful");

            // Clear input fields
            setfullName("");
            setStudentId("");
            setEmail("");
            setPassword("");
        } catch (error) {
            let message = "Registration failed";

            if (typeof error === "object" && error !== null && "response" in error) {
                // Potential Axios or similar library error with a 'response' object
                // You might need to cast 'error' to a specific type if you know it's an Axios error
                const axiosError = error as {
                    response?: { data?: { message?: string } };
                };
                message = axiosError.response?.data?.message || message;
            } else if (error instanceof Error) {
                // Standard JS error
                message = error.message;
            }

            Alert.alert("Registration Error", message);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="print-outline" size={40} color="white" />
                    </View>
                    <Text style={styles.title}>E-Print System</Text>
                    <Text style={styles.subtitle}>
                        Centralized Document Submission & Job Management
                    </Text>
                </View>

                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => router.push("/login")}
                    >
                        <Text style={styles.toggleText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
                        <Text style={styles.toggleTextActive}>Register</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        value={fullName}
                        onChangeText={setfullName}
                        placeholder="John Doe"
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="email@example.com"
                        style={styles.input}
                        keyboardType="email-address"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Student ID (optional)</Text>
                    <TextInput
                        value={studentId}
                        onChangeText={setStudentId}
                        placeholder="202612345"
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleRegistration}>
                        <Text style={styles.buttonText}>Register as Student</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
}
