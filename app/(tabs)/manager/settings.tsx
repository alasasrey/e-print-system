import { ManagerLayout } from "@/components/ManagerLayout";
import { styles as style } from "@/styles/studentStyles";
import axiosInstance from "@/utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router"; // Added router for redirection
import React, { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

//TODO: PLEASE FIX THIS CODE!!!

export default function ManagerSettingsScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    // 1. Setup State for all fields
    const [shopData, setShopData] = useState({
        // THIS CODE IS JUST A DEFAULT OR PLACEHOLDER
        name: "",
        address: "",
        contactNumber: "",
        operatingHours: "Mon-Fri: 8:00 AM - 6:00 PM",
        isActive: true,
    });

    const [loading, setLoading] = useState(false);

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");

    // 2. Handle Update Function
    const handleUpdate = async () => {
        setLoading(true);
        try {
            // This is where you would call your API (e.g., Supabase or Firebase)
            // await api.updateShopProfile(shopData);

            const userId = await AsyncStorage.getItem("userId");
            const formData = new FormData();

            formData.append("userId", userId || "1");
            formData.append("name", shopData?.name);
            formData.append("address", shopData?.address);
            formData.append("contactNumber", shopData?.contactNumber);
            formData.append("operatingHours", shopData?.operatingHours);
            formData.append("isActive", String(shopData?.isActive));

            const response = await axiosInstance.post(`/manager-settings`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Updating Shop with:", formData);

            // Mock delay DELETE THIS IF UNNECCESARY
            // await new Promise((resolve) => setTimeout(resolve, 1000));

            Alert.alert("Success", "Shop profile updated successfully!");
        } catch (error) {
            Alert.alert("Error", "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    // UPDATED FUNCTION: Deletes Shop + Deletes User Account + Clears Session
    const handleDeleteShop = async () => {
        Alert.alert(
            "Confirm Full Deletion",
            "This will permanently delete your Print Shop AND your Manager Account. This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete Everything",
                    style: "destructive",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const userId = await AsyncStorage.getItem("userId");

                            if (!userId) {
                                Alert.alert("Error", "User session not found.");
                                return;
                            }

                            // 1. Delete the Print Shop
                            await axiosInstance.delete(`/manager/delete-shop/${userId}`);

                            // 2. NEW: Delete the User Account
                            // Assuming your backend has an endpoint to delete the user by ID
                            await axiosInstance.delete(`/manager/delete/print-shop-account/${userId}`);

                            // 3. Clear all local storage (Auth Session)
                            await AsyncStorage.multiRemove(["userId", "userRole", "userToken"]);

                            Alert.alert("Account Deleted", "Your shop and account have been permanently removed.");

                            // 4. Redirect to the Login screen
                            router.replace("/(auth)/login");

                        } catch (error) {
                            console.error("Deletion error:", error);
                            Alert.alert("Error", "Could not complete full deletion. Please try again.");
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
        );
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

        const getPrintShopData = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");
                if (userId) {
                    const response = await axiosInstance.get(`/my-shops/${userId}`);

                    setShopData({ ...shopData, name: response.data.name })
                    setShopData({ ...shopData, address: response.data.address })
                    setShopData({ ...shopData, contactNumber: response.data.contactNumber })
                    setShopData({ ...shopData, operatingHours: response.data.operatingHours })
                    setShopData({ ...shopData, isActive: response.data.isActive })

                }
            } catch (err) {
                console.error("Error fetching print shop data:", err);
            }
        };
        getPrintShopData();
    }, []);

    return (
        <ManagerLayout
            currentRoute="settings"
            title="Settings"
            subtitle="Manage your print shop profile and preferences"
        >
            <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>

                {/* MANAGER PROFILE AREA */}
                <View style={style.formCard}>
                    <Text style={styles.sectionTitle}>Manager Profile Information</Text>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={style.smallLabel}>Name</Text>
                        <Text style={[style.detailValue, { fontSize: 16, marginTop: 4 }]}>
                            {fullname}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.smallLabel}>Email</Text>
                        <Text style={[style.detailValue, { fontSize: 16, marginTop: 4 }]}>
                            {email}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.smallLabel}>Shop Name</Text>
                        <Text style={[style.detailValue, { fontSize: 16, marginTop: 4 }]}>
                            {shopData.name}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.smallLabel}>Location / Address</Text>
                        <Text style={[style.detailValue, { fontSize: 16, marginTop: 4 }]}>
                            {shopData.address}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.smallLabel}>Contact Number</Text>
                        <Text style={[style.detailValue, { fontSize: 16, marginTop: 4 }]}>
                            {shopData.contactNumber}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.smallLabel}>Operating Hours</Text>
                        <Text style={[style.detailValue, { fontSize: 16, marginTop: 4 }]}>
                            {shopData.name}
                        </Text>
                    </View>
                </View>


                {/* SHOP SETTINGS AREA  */}
                <View style={{ flexDirection: isMobile ? "column" : "row", gap: 20 }}>
                    {/* SHOP INFORMATION SECTION */}
                    <View style={[styles.card, { flex: isMobile ? 0 : 2 }]}>
                        <Text style={styles.sectionTitle}>Shop Information</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Shop Name</Text>
                            <TextInput
                                style={styles.input}
                                value={shopData.name}
                                onChangeText={(text) =>
                                    setShopData({ ...shopData, name: text })
                                }
                                placeholder="Your Shop Name"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Location / Address</Text>
                            <TextInput
                                style={styles.input}
                                value={shopData.address}
                                onChangeText={(text) =>
                                    setShopData({ ...shopData, address: text })
                                }
                                placeholder="Your Address"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contact Number</Text>
                            <TextInput
                                style={styles.input}
                                value={shopData.contactNumber}
                                onChangeText={(text) =>
                                    setShopData({ ...shopData, contactNumber: text })
                                }
                                keyboardType="phone-pad"
                                placeholder="Your Contact Number"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Operating Hours</Text>
                            <TextInput
                                style={styles.input}
                                value={shopData.operatingHours}
                                onChangeText={(text) =>
                                    setShopData({ ...shopData, operatingHours: text })
                                }
                                placeholder="For example: Mon-Fri: 8:00 AM - 6:00 PM"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.saveButton, loading && { opacity: 0.7 }]}
                            onPress={handleUpdate}
                            disabled={loading}
                        >
                            <Text style={styles.saveButtonText}>
                                {loading ? "Updating..." : "Update Shop Profile"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* SHOP STATUS & PREFERENCES */}
                    <View style={[styles.card, { flex: isMobile ? 0 : 1 }]}>
                        <Text style={styles.sectionTitle}>Preferences</Text>

                        <View style={styles.settingRow}>
                            <View>
                                <Text style={styles.settingLabel}>Shop Status</Text>
                                <Text style={styles.settingSub}>Set your shop as active</Text>
                            </View>
                            <Switch
                                value={shopData.isActive}
                                onValueChange={(val) =>
                                    setShopData({ ...shopData, isActive: val })
                                }
                                trackColor={{ false: "#767577", true: "#0A0A1B" }}
                            />
                        </View>

                        <View
                            style={[
                                styles.statusIndicator,
                                { backgroundColor: shopData.isActive ? "#E8F9F1" : "#FEEBEB" },
                            ]}
                        >
                            <Text
                                style={{
                                    color: shopData.isActive ? "#10B981" : "#FF5252",
                                    fontWeight: "bold",
                                    fontSize: 12,
                                }}
                            >
                                {shopData.isActive
                                    ? "● SHOP IS CURRENTLY ACTIVE"
                                    : "○ SHOP IS CURRENTLY OFFLINE"}
                            </Text>
                        </View>

                        {/* Danger Zone */}
                        <View style={styles.dangerZone}>
                            <Text style={[styles.label, { color: "#FF5252" }]}>
                                Danger Zone
                            </Text>
                            <TouchableOpacity
                                style={styles.dangerButton}
                                onPress={handleDeleteShop}
                            >
                                <Text style={styles.dangerButtonText}>Delete Shop Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ManagerLayout>
    );
}

// ... your styles remain largely the same, but added a dangerZone wrapper
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: "#EEE",
        ...Platform.select({
            android: { elevation: 3 },
            web: { boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" },
        }),
    },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
    inputGroup: { marginBottom: 15 },
    label: { fontSize: 13, fontWeight: "600", color: "#666", marginBottom: 8 },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#EEE",
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#FAFAFA",
    },
    saveButton: {
        backgroundColor: "#0A0A1B",
        height: 45,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    saveButtonText: { color: "white", fontWeight: "bold" },
    settingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    settingLabel: { fontSize: 15, fontWeight: "bold" },
    settingSub: { fontSize: 12, color: "#888" },
    statusIndicator: { padding: 10, borderRadius: 8, alignItems: "center" },
    dangerButton: {
        marginTop: 10,
        height: 45,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FF5252",
    },
    dangerButtonText: { color: "#FF5252", fontWeight: "bold" },
    dangerZone: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#EEE",
        paddingTop: 20,
    },
});
