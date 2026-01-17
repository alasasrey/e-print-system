import { styles } from "@/styles/studentStyles";
import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 1. Import AsyncStorage
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');

    const handleLogout = async () => {
        const performLogout = async () => {
            try {
                // 1. Clear Storage
                await AsyncStorage.clear(); // Clears EVERYTHING (token, role, etc.)

                // 2. Verify it's cleared (Optional debug)
                console.log("Storage cleared");

                // 3. Absolute path redirect
                // Use the exact path to your login screen
                router.replace("/(auth)/login");
            } catch (e) {
                console.error("Logout Error:", e);
                Alert.alert("Error", "Logout failed");
            }
        };

        Alert.alert(
            "Logout",
            "Are you sure?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: performLogout }
            ]
        );
    };

    //REMEMBER: USE useEffect(()=>{}, []); FOR GET AND POST REQUEST AND TO MAKE SURE IT RUNS ONCE ONLY 
    useEffect(() => {
        const getUserData = async () => {
            const userId = await AsyncStorage.getItem('userId');

            const response = await axiosInstance.get(`/profile/${userId}`);
            setFullname(response.data.fullname);
            setEmail(response.data.email);
        }

        getUserData();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFB' }}>
            <ScrollView style={styles.homePadding}>
                {/* Header Section */}
                <View style={{ marginBottom: 30 }}>
                    <Text style={styles.welcomeText}>Profile</Text>
                    <Text style={styles.subWelcome}>Manage your account information</Text>
                </View>

                {/* Profile Information Card */}
                <View style={styles.formCard}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.smallLabel}>Name</Text>
                        <Text style={[styles.detailValue, { fontSize: 16, marginTop: 4 }]}> {fullname} </Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.smallLabel}>Email</Text>
                        <Text style={[styles.detailValue, { fontSize: 16, marginTop: 4 }]}> {email} </Text>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={[styles.primaryButton, { backgroundColor: '#FF5252', marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
                        onPress={handleLogout} // 3. Link to function
                    >
                        <Ionicons name="log-out-outline" size={20} color="white" style={{ marginRight: 8 }} />
                        <Text style={styles.primaryButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* FIXED BOTTOM NAVIGATION */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/home")}>
                    <Ionicons name="home-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/submitJob")}>
                    <Ionicons name="cloud-upload-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/orders")}>
                    <Ionicons name="list-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItemActive}>
                    <Ionicons name="person" size={24} color="white" />
                    <Text style={styles.navTextActive}>Profile</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}