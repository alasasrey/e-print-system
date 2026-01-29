import { ManagerLayout } from "@/components/ManagerLayout";
import TimePicker from "@/components/timePicker";
import { supabase } from "@/lib/supabase"; // Import your Supabase client
import { styles as style } from "@/styles/studentStyles";
import { router } from "expo-router";
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

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ManagerSettingsScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const [shopData, setShopData] = useState({
        name: "",
        address: "",
        contact_number: "",
        open_time: new Date(new Date().setHours(8, 0, 0)),
        close_time: new Date(new Date().setHours(18, 0, 0)),
        operating_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], // New State
        is_active: true,
    });

    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");

    // UI State for showing pickers
    const [showOpenPicker, setShowOpenPicker] = useState(false);
    const [showClosePicker, setShowClosePicker] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) { router.replace("/(auth)/login"); return; }

                //  GETTING THE MANAGER PROFILE
                const { data, error, status } = await supabase
                    .from('e_print_users')
                    .select('fullname, email')
                    .eq('auth_user_id', user.id)
                    .single();


                if (error && status !== 406) throw error;

                if (data) {
                    setFullname(data.fullname);
                    setEmail(data.email);
                }

                // GETTING THE SHOP INFORMATION
                const { data: shop } = await supabase
                    .from('print_shops')
                    .select('name, address, contact_number, open_time, close_time, operating_days, is_active')
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (shop) {
                    setShopData({
                        name: shop.name || "",
                        address: shop.address || "",
                        contact_number: shop.contact_number || "",
                        open_time: shop.open_time ? new Date(`1970-01-01T${shop.open_time}`) : new Date(new Date().setHours(8, 0)),
                        close_time: shop.close_time ? new Date(`1970-01-01T${shop.close_time}`) : new Date(new Date().setHours(18, 0)),
                        operating_days: shop.operating_days || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        is_active: shop.is_active ?? true,
                    });
                }
            } catch (err) { console.error(err); }
        };
        loadInitialData();
    }, []);

    const toggleDay = (day: string) => {
        setShopData(prev => {
            const days = prev.operating_days.includes(day)
                ? prev.operating_days.filter(d => d !== day)
                : [...prev.operating_days, day];
            return { ...prev, operating_days: days };
        });
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const openString = shopData.open_time.toLocaleTimeString('en-GB', { hour12: false });
            const closeString = shopData.close_time.toLocaleTimeString('en-GB', { hour12: false });

            const { error } = await supabase
                .from('print_shops')
                .upsert({
                    user_id: user?.id,
                    name: shopData.name,
                    address: shopData.address,
                    contact_number: shopData.contact_number,
                    open_time: openString,
                    close_time: closeString,
                    operating_days: shopData.operating_days, // Save the array
                    is_active: shopData.is_active,
                }, { onConflict: 'user_id' });

            if (error) throw error;
            Alert.alert("Success", "Shop profile updated!");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally { setLoading(false); }
    };

    const onTimeChange = (event: any, selectedDate?: Date, field?: 'open' | 'close') => {
        // Always hide pickers after selection (except iOS which uses a spinner)
        if (Platform.OS !== 'ios') {
            setShowOpenPicker(false);
            setShowClosePicker(false);
        }

        if (selectedDate) {
            if (field === 'open') setShopData({ ...shopData, open_time: selectedDate });
            else setShopData({ ...shopData, close_time: selectedDate });
        }
    };

    const formatDisplayTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

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
                </View>


                {/* SHOP SETTINGS AREA  */}
                <View style={{ flexDirection: isMobile ? "column" : "row", gap: 20 }}>
                    <View style={[styles.card, { flex: isMobile ? 0 : 2 }]}>
                        <Text style={styles.sectionTitle}>Shop Information</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Shop Name</Text>
                            <TextInput
                                style={styles.input}
                                value={shopData.name}
                                onChangeText={(text) => setShopData({ ...shopData, name: text })}
                                placeholder="Your Shop Name"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Location / Address</Text>
                            <TextInput
                                style={styles.input}
                                value={shopData.address}
                                onChangeText={(text) => setShopData({ ...shopData, address: text })}
                                placeholder="Your Address"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contact Number</Text>
                            <TextInput
                                style={styles.input}
                                value={shopData.contact_number}
                                onChangeText={(text) => setShopData({ ...shopData, contact_number: text })}
                                keyboardType="phone-pad"
                                placeholder="Your Contact Number"
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

                    <View style={[styles.card, { marginTop: 20, borderTopWidth: 0, elevation: 0 }]}>
                        <Text style={styles.sectionTitle}>Operating Schedule</Text>

                        {/* DAYS SELECTOR */}
                        <Text style={styles.label}>Select Operating Days</Text>
                        <View style={styles.daysContainer}>
                            {DAYS_OF_WEEK.map((day) => {
                                const isSelected = shopData.operating_days.includes(day);
                                return (
                                    <TouchableOpacity
                                        key={day}
                                        style={[styles.dayChip, isSelected && styles.dayChipActive]}
                                        onPress={() => toggleDay(day)}
                                    >
                                        <Text style={[styles.dayText, isSelected && styles.dayTextActive]}>
                                            {day.substring(0, 3)}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* TIME PICKERS */}
                        <Text style={styles.label}>Operating Hours</Text>
                        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15 }}>
                            <TouchableOpacity
                                style={[styles.timePickerButton, { flex: 1 }]}
                                onPress={() => {
                                    setShowOpenPicker(!showOpenPicker);
                                    setShowClosePicker(false);
                                }}
                            >
                                <Text style={styles.label}>Open: {formatDisplayTime(shopData.open_time)}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.timePickerButton, { flex: 1 }]}
                                onPress={() => {
                                    setShowClosePicker(!showClosePicker);
                                    setShowOpenPicker(false);
                                }}
                            >
                                <Text style={styles.label}>Close: {formatDisplayTime(shopData.close_time)}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* ACTUAL PICKER UI RENDERING */}
                        {showOpenPicker && (
                            <View style={styles.pickerWrapper}>
                                <Text style={styles.label}>Set Opening Time</Text>
                                <TimePicker
                                    value={shopData.open_time}
                                    onChange={(e: any, d: any) => onTimeChange(e, d, 'open')}
                                />
                            </View>
                        )}

                        {showClosePicker && (
                            <View style={styles.pickerWrapper}>
                                <Text style={styles.label}>Set Closing Time</Text>
                                <TimePicker
                                    value={shopData.close_time}
                                    onChange={(e: any, d: any) => onTimeChange(e, d, 'close')}
                                />
                            </View>
                        )}

                        <TouchableOpacity
                            style={[styles.saveButton, { marginTop: 20 }]}
                            onPress={handleUpdate}
                            disabled={loading}
                        >
                            <Text style={styles.saveButtonText}>
                                {loading ? "Saving..." : "Save Shop Profile"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* ======================================================== */}
                </View>






                <View style={[styles.card, { flex: isMobile ? 0 : 1 }]}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <View style={styles.settingRow}>
                        <View>
                            <Text style={styles.settingLabel}>Shop Status</Text>
                            <Text style={styles.settingSub}>Set your shop as active</Text>
                        </View>
                        <Switch
                            value={shopData.is_active}
                            onValueChange={(val) => setShopData({ ...shopData, is_active: val })}
                            trackColor={{ false: "#767577", true: "#0A0A1B" }}
                        />
                    </View>

                    <View
                        style={[
                            styles.statusIndicator,
                            { backgroundColor: shopData.is_active ? "#E8F9F1" : "#FEEBEB" },
                        ]}
                    >
                        <Text
                            style={{
                                color: shopData.is_active ? "#10B981" : "#FF5252",
                                fontWeight: "bold",
                                fontSize: 12,
                            }}
                        >
                            {shopData.is_active
                                ? "● SHOP IS CURRENTLY ACTIVE"
                                : "○ SHOP IS CURRENTLY OFFLINE"}
                        </Text>
                    </View>

                    {/* MAYBE IN THE FUTURE I WILL ADD THE DELETE SHOP OR USER BUT NOT RIGHT NOW */}
                    {/* <View style={styles.dangerZone}>
                        <Text style={[styles.label, { color: "#FF5252" }]}>
                            Danger Zone
                        </Text>
                        <TouchableOpacity
                            style={styles.dangerButton}
                            onPress={handleDeleteShop}
                        >
                            <Text style={styles.dangerButtonText}>Delete Shop Account</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </ScrollView>
        </ManagerLayout >
    );
}

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

    timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    timePickerButton: {
        height: 45,
        borderWidth: 1,
        borderColor: "#EEE",
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FAFAFA"
    },

    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 15,
    },
    dayChip: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#DDD",
        backgroundColor: "#FFF",
    },
    dayChipActive: {
        backgroundColor: "#0A0A1B",
        borderColor: "#0A0A1B",
    },
    dayText: {
        fontSize: 12,
        color: "#666",
        fontWeight: "600",
    },
    dayTextActive: {
        color: "#FFF",
    },

    pickerWrapper: {
        backgroundColor: '#F9F9F9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EEE'
    }
});