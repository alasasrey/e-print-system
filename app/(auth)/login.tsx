import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons'; // Ensure expo-vectors is installed
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/authStyles";


export default function LoginScreen() {
    // OLD CODE
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const handleLogin = async () => {
    //     try {
    //         //change the localhost in the api.js, app.json or .env
    //         const response = await axiosInstance.post(`/login`, {
    //             email,
    //             password,
    //         });

    //         const { token, role, user } = response.data;

    //         //SAVE AUTH DATA
    //         await AsyncStorage.multiSet([
    //             ["token", token],
    //             ["role", role],
    //             ["userId", String(user.id)],
    //         ]);

    //         //ROLE-BASED ROUTING
    //         if (role === "admin") {
    //             router.replace("/(tabs)/admin/dashboard");
    //         } else if (role === "manager") {
    //             router.replace("/(tabs)/manager/dashboard");
    //         } else {
    //             router.replace("/(tabs)/student/home");
    //         }

    //         Alert.alert("Success", "Login successful");
    //     } catch (error) {
    //         let message = "Unable to connect to server";

    //         if (error instanceof Error) {
    //             // Standard JS error
    //             message = error.message;
    //         } else if (error && typeof error === 'object' && 'response' in error && (error as any).response?.data?.message) {
    //             // Check if the error is an Axios error (or at least has a response object)
    //             message = (error as any).response.data.message;
    //         }

    //         Alert.alert("Login Failed", message);
    //     }
    // };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            // 1. SIGN IN with Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            const authUser = data.user;

            // 2. FETCH PROFILE DATA from your custom 'users' table
            // We fetch the 'role', 'student_id', and 'fullname' using the auth id
            const { data: userProfile, error: profileError } = await supabase
                .from('users') // Updated to your table name
                .select('role, student_id, fullname')
                .eq('id', authUser.id) // This matches the UUID from Supabase Auth
                .single();

            if (profileError) throw new Error("User profile not found");

            // 3. SAVE TO ASYNC STORAGE
            // We save the role and student_id so you can use them in other screens
            await AsyncStorage.multiSet([
                ["role", userProfile.role],
                ["userId", authUser.id],
                ["studentId", userProfile.student_id || ""],
                ["userName", userProfile.fullname || ""],
            ]);

            // 4. ROLE-BASED ROUTING
            const role = userProfile.role;
            if (role === "admin") {
                router.replace("/(tabs)/admin/dashboard");
            } else if (role === "manager") {
                router.replace("/(tabs)/manager/dashboard");
            } else {
                router.replace("/(tabs)/student/home");
            }

            Alert.alert("Success", `Welcome back, ${userProfile.fullname}!`);
        } catch (error: any) {
            Alert.alert("Login Failed", error.message || "An unknown error occurred");
        } finally {
            setLoading(false);
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