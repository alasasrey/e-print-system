import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";

export default function ManagerSettingsScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const [isShopActive, setIsShopActive] = useState(true);

    return (
        <View style={{ flex: 1, flexDirection: isMobile ? 'column' : 'row', backgroundColor: '#F8F9FA' }}>

            {/* SIDEBAR - WEB ONLY */}
            {!isMobile && (
                <View style={navStyles.sidebar}>
                    <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>E-Print</Text>
                        <Text style={{ fontSize: 12, color: '#888' }}>Shop Manager</Text>
                    </View>
                    <TouchableOpacity style={navStyles.drawerItem} onPress={() => router.push("/manager/dashboard")}>
                        <Ionicons name="grid-outline" size={20} color="#666" />
                        <Text style={navStyles.drawerText}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={navStyles.drawerItem} onPress={() => router.push("/manager/orders")}>
                        <Ionicons name="list-outline" size={20} color="#666" />
                        <Text style={navStyles.drawerText}>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[navStyles.drawerItem, navStyles.activeItem]}>
                        <Ionicons name="settings" size={20} color="white" />
                        <Text style={[navStyles.drawerText, { color: 'white' }]}>Settings</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* MAIN CONTENT */}
            <View style={{ flex: 1 }}>
                <View style={navStyles.header}>
                    {isMobile && <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Shop Settings</Text>}
                    <TouchableOpacity onPress={() => router.replace("/")} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="log-out-outline" size={20} color="#666" />
                        {!isMobile && <Text style={{ marginLeft: 5, color: '#666' }}>Logout</Text>}
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>Settings</Text>
                    <Text style={{ color: '#888', marginBottom: 25 }}>Manage your print shop profile and preferences</Text>

                    <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 20 }}>

                        {/* SHOP INFORMATION SECTION */}
                        <View style={[styles.card, { flex: isMobile ? 0 : 2 }]}>
                            <Text style={styles.sectionTitle}>Shop Information</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Shop Name</Text>
                                <TextInput style={styles.input} defaultValue="QuickPrint Express" />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Location / Address</Text>
                                <TextInput style={styles.input} defaultValue="Main Campus Building A, Room 101" />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Operating Hours</Text>
                                <TextInput style={styles.input} defaultValue="Mon-Fri: 8:00 AM - 6:00 PM" />
                            </View>

                            <TouchableOpacity style={styles.saveButton}>
                                <Text style={styles.saveButtonText}>Update Shop Profile</Text>
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
                                    value={isShopActive}
                                    onValueChange={setIsShopActive}
                                    trackColor={{ false: "#767577", true: "#0A0A1B" }}
                                />
                            </View>

                            <View style={[styles.statusIndicator, { backgroundColor: isShopActive ? '#E8F9F1' : '#FEEBEB' }]}>
                                <Text style={{ color: isShopActive ? '#10B981' : '#FF5252', fontWeight: 'bold', fontSize: 12 }}>
                                    {isShopActive ? '● SHOP IS CURRENTLY ACTIVE' : '○ SHOP IS CURRENTLY OFFLINE'}
                                </Text>
                            </View>

                            <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 20 }}>
                                <Text style={[styles.label, { color: '#FF5252' }]}>Danger Zone</Text>
                                <TouchableOpacity style={styles.dangerButton}>
                                    <Text style={styles.dangerButtonText}>Delete Shop Account</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* MOBILE NAV */}
            {isMobile && (
                <View style={navStyles.bottomNav}>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push("/manager/dashboard")}>
                        <Ionicons name="grid-outline" size={24} color="#888" />
                        <Text style={{ fontSize: 10, marginTop: 4 }}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push("/manager/orders")}>
                        <Ionicons name="list-outline" size={24} color="#888" />
                        <Text style={{ fontSize: 10, marginTop: 4 }}>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Ionicons name="settings" size={24} color="#0A0A1B" />
                        <Text style={{ fontSize: 10, marginTop: 4 }}>Settings</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const navStyles = StyleSheet.create({
    sidebar: { width: 250, backgroundColor: '#FFF', borderRightWidth: 1, borderRightColor: '#EEE', paddingTop: 20 },
    header: { height: 60, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    drawerItem: { flexDirection: 'row', alignItems: 'center', padding: 12, marginHorizontal: 10, borderRadius: 8 },
    activeItem: { backgroundColor: '#0A0A1B' },
    drawerText: { marginLeft: 12, color: '#666', fontWeight: '600' },
    bottomNav: { flexDirection: 'row', height: 70, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'space-around', alignItems: 'center' }
});

const styles = StyleSheet.create({
    card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#EEE', ...Platform.select({ android: { elevation: 3 }, web: { boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' } }) },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    inputGroup: { marginBottom: 15 },
    label: { fontSize: 13, fontWeight: '600', color: '#666', marginBottom: 8 },
    input: { height: 45, borderWidth: 1, borderColor: '#EEE', borderRadius: 8, paddingHorizontal: 12, backgroundColor: '#FAFAFA' },
    saveButton: { backgroundColor: '#0A0A1B', height: 45, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    saveButtonText: { color: 'white', fontWeight: 'bold' },
    settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    settingLabel: { fontSize: 15, fontWeight: 'bold' },
    settingSub: { fontSize: 12, color: '#888' },
    statusIndicator: { padding: 10, borderRadius: 8, alignItems: 'center' },
    dangerButton: { marginTop: 10, height: 45, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FF5252' },
    dangerButtonText: { color: '#FF5252', fontWeight: 'bold' }
});