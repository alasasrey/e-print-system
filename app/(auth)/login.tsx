import { Ionicons } from '@expo/vector-icons'; // Ensure expo-vectors is installed
import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/authStyles";

// TODO: FINISH THIS CODE!!!
async function handleLogin() {
    try {
        // const a = await fetch("",);
    } catch (error) {

    }
}

export default function LoginScreen() {
    return (
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
                    placeholder="student@university.edu"
                    style={styles.input}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="•••••"
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace("/(tabs)/student/home")}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}