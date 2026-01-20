//TODO: PLEASE FIX THIS CODE!!!

import { ManagerLayout } from "@/components/ManagerLayout";
import { StatCard } from "@/components/statCard";
import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

//TODO: PLEASE FIX THIS CODE!!!
//PLEASE FINISH THIS CODE!!!

export default function ManagerDashboardScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768; // Standard breakpoint or screen size for mobile/tablet
    const [pending, setPending] = useState(0);
    const [processing, setProcessing] = useState(0);
    const [ready, setReady] = useState(0);
    const [approved, setApproved] = useState(0);
    const [dailyRevenue, setDailyRevenue] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");
                if (userId) {
                    const response = await axiosInstance.get(
                        `/manager-dashboard/${userId}`,
                    );
                    //   fullname(response.data.fullname);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };
        getUserData();
    }, []);

    return (
        <ManagerLayout
            currentRoute="dashboard"
            title="Dashboard Overview"
            subtitle="Monitor your print shop performance"
        >
            <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
                <Text
                    style={{
                        fontSize: isMobile ? 20 : 24,
                        fontWeight: "bold",
                        marginBottom: 5,
                    }}
                >
                    Dashboard Overview
                </Text>
                <Text style={{ color: "#888", marginBottom: 25 }}>
                    Monitor your print shop performance
                </Text>

                {/* STAT CARDS GRID - Responsive Columns */}
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}
                >
                    <StatCard
                        label="Pending Approval"
                        value="1"
                        subtext="Requires action"
                        icon="time-outline"
                        color="#FFB020"
                        isMobile={isMobile}
                    />
                    <StatCard
                        label="Active Jobs"
                        value="2"
                        subtext="In progress"
                        icon="print-outline"
                        color="#10B981"
                        isMobile={isMobile}
                    />
                    <StatCard
                        label="Ready for Pickup"
                        value="0"
                        subtext="Waiting"
                        icon="checkmark-circle-outline"
                        color="#3B82F6"
                        isMobile={isMobile}
                    />
                    <StatCard
                        label="Completed Today"
                        value="0"
                        subtext="Finished"
                        icon="checkmark-done-outline"
                        color="#10B981"
                        isMobile={isMobile}
                    />
                    <StatCard
                        label="Today's Revenue"
                        value="₱0.00"
                        subtext="Daily earnings"
                        icon="cash-outline"
                        color="#666"
                        isMobile={isMobile}
                    />
                    <StatCard
                        label="Total Revenue"
                        value="₱0.00"
                        subtext="All-time"
                        icon="trending-up-outline"
                        color="#666"
                        isMobile={isMobile}
                    />
                </View>
            </ScrollView>
        </ManagerLayout>
    );
}

const navStyles = StyleSheet.create({
    sidebar: {
        width: 250,
        backgroundColor: "#FFF",
        borderRightWidth: 1,
        borderRightColor: "#EEE",
        paddingTop: 20,
    },
    header: {
        height: 60,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginHorizontal: 10,
        borderRadius: 8,
    },
    activeItem: { backgroundColor: "#0A0A1B" },
    drawerText: { marginLeft: 12, color: "#666", fontWeight: "600" },
    bottomNav: {
        flexDirection: "row",
        height: 70,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
        justifyContent: "space-around",
        alignItems: "center",
    },
});

const SidebarItem = ({ icon, label, onPress, active }: any) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
            navStyles.drawerItem,
            active && navStyles.activeItem,
            { cursor: "pointer" } as any,
        ]}
    >
        <Ionicons name={icon} size={20} color={active ? "white" : "#666"} />
        <Text style={[navStyles.drawerText, { color: active ? "white" : "#666" }]}>
            {label}
        </Text>
    </TouchableOpacity>
);

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
});
