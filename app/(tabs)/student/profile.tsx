import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../styles/studentStyles";

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFB' }}>
            <View style={styles.homePadding}>
                {/* Header Section */}
                <View style={{ marginBottom: 30 }}>
                    <Text style={styles.welcomeText}>Profile</Text>
                    <Text style={styles.subWelcome}>Manage your account information</Text>
                </View>

                {/* Profile Information Card */}
                <View style={styles.formCard}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.smallLabel}>Name</Text>
                        <Text style={[styles.detailValue, { fontSize: 16, marginTop: 4 }]}>student</Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.smallLabel}>Email</Text>
                        <Text style={[styles.detailValue, { fontSize: 16, marginTop: 4 }]}>student@university.edu</Text>
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={[styles.primaryButton, { backgroundColor: '#FF5252', marginTop: 20 }]}
                    onPress={() => router.replace("/")}
                >
                    <Ionicons name="log-out-outline" size={20} color="white" style={{ marginRight: 8 }} />
                    <Text style={styles.primaryButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* FIXED BOTTOM NAVIGATION */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/home")}>
                    <Ionicons name="home-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/submitJob")}>
                    <Ionicons name="cloud-upload-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/orders")}>
                    <Ionicons name="list-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItemActive}>
                    <Ionicons name="person" size={22} color="white" />
                    <Text style={styles.navTextActive}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}