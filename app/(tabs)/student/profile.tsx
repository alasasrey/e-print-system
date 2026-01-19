import { styles } from "@/styles/studentStyles";
import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
// 1. Import Platform from react-native
import {
    Alert,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");

    const performLogout = async () => {
        try {
            // Clear Storage
            await AsyncStorage.clear();
            console.log("Storage cleared");

            // Absolute path redirect
            router.replace("/(auth)/login");
        } catch (e) {
            console.error("Logout Error:", e);
            if (Platform.OS !== "web") {
                Alert.alert("Error", "Logout failed");
            } else {
                alert("Logout failed");
            }
        }
    };

    const handleLogout = () => {
        if (Platform.OS === "web") {
            // 2. Browser-native confirmation for Web
            const confirmLogout = window.confirm("Are you sure you want to logout?");
            if (confirmLogout) {
                performLogout();
            }
        } else {
            // 3. Mobile-native Alert for Android/iOS
            Alert.alert("Logout", "Are you sure?", [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: performLogout },
            ]);
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");
                if (userId) {
                    const response = await axiosInstance.get(`/profile/${userId}`);
                    setFullname(response.data.fullname);
                    setEmail(response.data.email);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };
        getUserData();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#FAFAFB" }}>
            <ScrollView style={styles.homePadding}>
                <View style={{ marginBottom: 30 }}>
                    <Text style={styles.welcomeText}>Profile</Text>
                    <Text style={styles.subWelcome}>Manage your account information</Text>
                </View>

                <View style={styles.formCard}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.smallLabel}>Name</Text>
                        <Text style={[styles.detailValue, { fontSize: 16, marginTop: 4 }]}>
                            {fullname}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.smallLabel}>Email</Text>
                        <Text style={[styles.detailValue, { fontSize: 16, marginTop: 4 }]}>
                            {email}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.primaryButton,
                            {
                                backgroundColor: "#FF5252",
                                marginTop: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            },
                        ]}
                        onPress={handleLogout}
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={20}
                            color="white"
                            style={{ marginRight: 8 }}
                        />
                        <Text style={styles.primaryButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Nav stays here */}
            <View style={styles.bottomNav}>
                {/* ... your navigation items ... */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/(tabs)/student/home")}
                >
                    <Ionicons name="home-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/(tabs)/student/submitJob")}
                >
                    <Ionicons name="cloud-upload-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/(tabs)/student/orders")}
                >
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
