import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/authStyles";

//TODO: FINISH THIS CODE!!!
async function handleRegister() {
    try {
        // const a = await fetch("",);
    } catch (error) {

    }
}


export default function RegisterScreen() {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="print-outline" size={40} color="white" />
                    </View>
                    <Text style={styles.title}>E-Print System</Text>
                    <Text style={styles.subtitle}>Centralized Document Submission & Job Management</Text>
                </View>

                <View style={styles.toggleContainer}>
                    <TouchableOpacity style={styles.toggleButton} onPress={() => router.push("/login")}>
                        <Text style={styles.toggleText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
                        <Text style={styles.toggleTextActive}>Register</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput placeholder="John Doe" style={styles.input} placeholderTextColor="#999" />

                    <Text style={styles.label}>University Email</Text>
                    <TextInput placeholder="your.email@university.edu" style={styles.input} keyboardType="email-address" placeholderTextColor="#999" />

                    <Text style={styles.label}>Student ID (optional)</Text>
                    <TextInput placeholder="STU-2024-001" style={styles.input} placeholderTextColor="#999" />

                    <Text style={styles.label}>Password</Text>
                    <TextInput placeholder="••••••••" secureTextEntry style={styles.input} placeholderTextColor="#999" />

                    <TouchableOpacity style={styles.button} onPress={() => router.replace("/(tabs)/student/home")}>
                        <Text style={styles.buttonText}>Register as Student</Text>
                    </TouchableOpacity>
                </View>

                {/* REMEMBER: THIS IS JUST A TEST CODE FOR ROUTING TO OTHER FILES 
            PLEASE DELETE THIS CODE IF YOU ARE DONE!!!!!!!
             */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace("/(tabs)/manager/dashboard")}
                >
                    <Text style={styles.buttonText}>manager dashboard</Text>
                </TouchableOpacity>

                {/* REMEMBER: THIS IS JUST A TEST CODE FOR ROUTING TO OTHER FILES 
            PLEASE DELETE THIS CODE IF YOU ARE DONE!!!!!!!
             */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace("/(tabs)/admin/dashboard")}
                >
                    <Text style={styles.buttonText}>admin dashboard</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}