// import { ManagerLayout } from "@/components/ManagerLayout";
// import React, { useState } from "react";
// import {
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Switch,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     useWindowDimensions,
//     View,
// } from "react-native";

// export default function ManagerSettingsScreen() {
//     const { width } = useWindowDimensions();
//     const isMobile = width < 768;
//     const [isShopActive, setIsShopActive] = useState(true);

//     return (
//         <ManagerLayout
//             currentRoute="settings"
//             title="Order Dashboard"
//             subtitle="Manage your print shop profile and preferences"
//         >
//             <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
//                 <View style={{ flexDirection: isMobile ? "column" : "row", gap: 20 }}>
//                     {/* SHOP INFORMATION SECTION */}
//                     <View style={[styles.card, { flex: isMobile ? 0 : 2 }]}>
//                         <Text style={styles.sectionTitle}>Shop Information</Text>

//                         <View style={styles.inputGroup}>
//                             <Text style={styles.label}>Shop Name</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="QuickPrint Express"
//                             />
//                         </View>

//                         <View style={styles.inputGroup}>
//                             <Text style={styles.label}>Location / Address</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Main Campus Building A, Room 101"
//                             />
//                         </View>

//                         <View style={styles.inputGroup}>
//                             <Text style={styles.label}>Contact Number</Text>
//                             <TextInput style={styles.input} placeholder="09123456789" />
//                         </View>

//                         <View style={styles.inputGroup}>
//                             <Text style={styles.label}>Operating Hours</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Mon-Fri: 8:00 AM - 6:00 PM"
//                             />
//                         </View>

//                         <TouchableOpacity style={styles.saveButton}>
//                             <Text style={styles.saveButtonText}>Update Shop Profile</Text>
//                         </TouchableOpacity>
//                     </View>

//                     {/* SHOP STATUS & PREFERENCES */}
//                     <View style={[styles.card, { flex: isMobile ? 0 : 1 }]}>
//                         <Text style={styles.sectionTitle}>Preferences</Text>

//                         <View style={styles.settingRow}>
//                             <View>
//                                 <Text style={styles.settingLabel}>Shop Status</Text>
//                                 <Text style={styles.settingSub}>Set your shop as active</Text>
//                             </View>
//                             <Switch
//                                 value={isShopActive}
//                                 onValueChange={setIsShopActive}
//                                 trackColor={{ false: "#767577", true: "#0A0A1B" }}
//                             />
//                         </View>

//                         <View
//                             style={[
//                                 styles.statusIndicator,
//                                 { backgroundColor: isShopActive ? "#E8F9F1" : "#FEEBEB" },
//                             ]}
//                         >
//                             <Text
//                                 style={{
//                                     color: isShopActive ? "#10B981" : "#FF5252",
//                                     fontWeight: "bold",
//                                     fontSize: 12,
//                                 }}
//                             >
//                                 {isShopActive
//                                     ? "● SHOP IS CURRENTLY ACTIVE"
//                                     : "○ SHOP IS CURRENTLY OFFLINE"}
//                             </Text>
//                         </View>

//                         <View
//                             style={{
//                                 marginTop: 20,
//                                 borderTopWidth: 1,
//                                 borderTopColor: "#EEE",
//                                 paddingTop: 20,
//                             }}
//                         >
//                             <Text style={[styles.label, { color: "#FF5252" }]}>
//                                 Danger Zone
//                             </Text>
//                             <TouchableOpacity style={styles.dangerButton}>
//                                 <Text style={styles.dangerButtonText}>Delete Shop Account</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </ScrollView>
//         </ManagerLayout>
//     );
// }

// const navStyles = StyleSheet.create({
//     sidebar: {
//         width: 250,
//         backgroundColor: "#FFF",
//         borderRightWidth: 1,
//         borderRightColor: "#EEE",
//         paddingTop: 20,
//     },
//     header: {
//         height: 60,
//         backgroundColor: "#FFF",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingHorizontal: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: "#EEE",
//     },
//     drawerItem: {
//         flexDirection: "row",
//         alignItems: "center",
//         padding: 12,
//         marginHorizontal: 10,
//         borderRadius: 8,
//     },
//     activeItem: { backgroundColor: "#0A0A1B" },
//     drawerText: { marginLeft: 12, color: "#666", fontWeight: "600" },
//     bottomNav: {
//         flexDirection: "row",
//         height: 70,
//         backgroundColor: "#FFF",
//         borderTopWidth: 1,
//         borderTopColor: "#EEE",
//         justifyContent: "space-around",
//         alignItems: "center",
//     },
// });

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: "#FFF",
//         borderRadius: 16,
//         padding: 20,
//         borderWidth: 1,
//         borderColor: "#EEE",
//         ...Platform.select({
//             android: { elevation: 3 },
//             web: { boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" },
//         }),
//     },
//     sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
//     inputGroup: { marginBottom: 15 },
//     label: { fontSize: 13, fontWeight: "600", color: "#666", marginBottom: 8 },
//     input: {
//         height: 45,
//         borderWidth: 1,
//         borderColor: "#EEE",
//         borderRadius: 8,
//         paddingHorizontal: 12,
//         backgroundColor: "#FAFAFA",
//     },
//     saveButton: {
//         backgroundColor: "#0A0A1B",
//         height: 45,
//         borderRadius: 8,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 10,
//     },
//     saveButtonText: { color: "white", fontWeight: "bold" },
//     settingRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 15,
//     },
//     settingLabel: { fontSize: 15, fontWeight: "bold" },
//     settingSub: { fontSize: 12, color: "#888" },
//     statusIndicator: { padding: 10, borderRadius: 8, alignItems: "center" },
//     dangerButton: {
//         marginTop: 10,
//         height: 45,
//         borderRadius: 8,
//         justifyContent: "center",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#FF5252",
//     },
//     dangerButtonText: { color: "#FF5252", fontWeight: "bold" },
// });

import { ManagerLayout } from "@/components/ManagerLayout";
import axiosInstance from "@/utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
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
        //THIS CODE IS JUST A DEFAULT OR PLACEHOLDER
        name: "QuickPrint Express",
        address: "Main Campus Building A, Room 101",
        contactNumber: "09123456789",
        operatingHours: "Mon-Fri: 8:00 AM - 6:00 PM",
        isActive: true,
    });

    // const [shopName, setshopName] = useState('');
    // const [shopaddress, setShopAddress] = useState('');
    // const [contactNumber, setContactNumber] = useState('');
    // const [operatingHours, setOperatingHours] = useState('');
    // const [isShopActive, setIsShopActive] = useState(true);
    const [loading, setLoading] = useState(false);

    // 2. Handle Update Function
    const handleUpdate = async () => {
        setLoading(true);
        try {
            // This is where you would call your API (e.g., Supabase or Firebase)
            // await api.updateShopProfile(shopData);

            const userId = await AsyncStorage.getItem("userId");
            const formData = new FormData();

            formData.append("print_shop_owner_id", userId || "1");
            formData.append("name", shopData?.name);
            formData.append("address", shopData?.address);
            formData.append("contactNumber", shopData?.contactNumber);
            formData.append("operatingHours", shopData?.operatingHours);
            formData.append("is_active", String(shopData?.isActive));

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

    const handleDeleteShop = async () => {
        Alert.alert(
            "Confirm Deletion",
            "This action is permanent. All your shop data will be lost. Are you sure?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete My Shop",
                    style: "destructive",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const userId = await AsyncStorage.getItem("userId");
                            await axiosInstance.delete(`/manager/delete-shop/${userId}`);

                            Alert.alert("Deleted", "Your shop account has been removed.");
                            // Redirect user to home or setup page
                            // navigation.replace('Welcome');
                        } catch (error) {
                            Alert.alert("Error", "Could not delete shop. Try again later.");
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
        );
    };

    return (
        <ManagerLayout
            currentRoute="settings"
            title="Settings"
            subtitle="Manage your print shop profile and preferences"
        >
            <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
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
                                placeholder="QuickPrint Express"
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
                                placeholder="Address"
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
                                placeholder="09123456789"
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
                                placeholder="Mon-Fri: 8:00 AM - 6:00 PM"
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
