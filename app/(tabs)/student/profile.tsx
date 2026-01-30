import { supabase } from '@/lib/supabase'; // Adjust this path to your supabase client file
import { styles } from "@/styles/studentStyles";
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
    const [loading, setLoading] = useState(true);

    const performLogout = async () => {
        try {
            // 1. Log out from Supabase (clears session & local storage automatically)
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            // 2. Clear any additional custom storage if necessary
            await AsyncStorage.clear();

            console.log("Logged out successfully");
            router.replace("/(auth)/login");
        } catch (e: any) {
            console.error("Logout Error:", e);
            const message = e.message || "Logout failed";
            Platform.OS === "web" ? alert(message) : Alert.alert("Error", message);
        }
    };

    const handleLogout = () => {
        if (Platform.OS === "web") {
            if (window.confirm("Are you sure you want to logout?")) performLogout();
        } else {
            Alert.alert("Logout", "Are you sure?", [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: performLogout },
            ]);
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);

                // 1. Get the current authenticated user session
                const { data: { user }, error: authError } = await supabase.auth.getUser();

                if (authError || !user) throw authError;

                // 2. Fetch profile details from your custom 'e_print_users' table
                // We use .eq('id', user.id) assuming you linked them via UUID
                const { data, error, status } = await supabase
                    .from('e_print_users')
                    .select('fullname, email')
                    .eq('supabase_user_id', user.id)
                    .single();

                if (error && status !== 406) throw error;

                if (data) {
                    setFullname(data.fullname);
                    setEmail(data.email);
                }
            } catch (err: any) {
                console.error("Error fetching profile:", err.message);
            } finally {
                setLoading(false);
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
