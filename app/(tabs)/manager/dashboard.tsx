//TODO: PLEASE FIX THIS CODE!!!

import { ManagerLayout } from "@/components/ManagerLayout";
import { StatCard } from "@/components/statCard";
import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
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
    const [noShop, setNoShop] = useState(false);

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

                    if (response.data.noShop) {
                        setNoShop(true);
                    }

                    setPending(response.data?.pending);
                    setProcessing(response.data?.processing);
                    setReady(response.data?.ready);
                    setApproved(response.data?.approved);
                    setDailyRevenue(response.data?.dailyRevenue);
                    setTotalRevenue(response.data?.totalRevenue);

                    // console.log(`pending: ${response.data.pending}`);
                    // console.log(`processing: ${response.data.processing}`);
                    // console.log(`ready: ${response.data.ready}`);
                    // console.log(`approved: ${response.data.approved}`);
                    // console.log(`dailyRevenue: ${response.data.dailyRevenue}`);
                    // console.log(`totalRevenue: ${response.data.totalRevenue}`);
                }
            } catch (err) {
                console.error("Error fetching manager dashboard data:", err);
            }
        };
        getUserData();
    }, []);

    return (
        <>
            <ManagerLayout
                currentRoute="dashboard"
                title="Dashboard Overview"
                subtitle="Monitor your print shop performance"
            >
                {noShop ? (
                    <>
                        <Ionicons name="storefront-outline" size={50} color="#0A0A1B" />
                        <Text style={styles.setupTitle}>Welcome to e-Print!</Text>{" "}
                        <Text style={styles.setupSub}>
                            You haven't set up your shop profile yet.
                        </Text>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => router.push("/(tabs)/manager/settings")}
                        >
                            <Text style={{ color: "#fff" }}>Configure Shop Now</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    // Show your normal StatCards here
                    <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
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
                                value={pending || "0"}
                                subtext="Requires action"
                                icon="time-outline"
                                color="#FFB020"
                                isMobile={isMobile}
                            />
                            <StatCard
                                label="Active Jobs"
                                value={processing || "0"}
                                subtext="In progress"
                                icon="print-outline"
                                color="#10B981"
                                isMobile={isMobile}
                            />
                            <StatCard
                                label="Ready for Pickup"
                                value={ready || "0"}
                                subtext="Waiting"
                                icon="checkmark-circle-outline"
                                color="#3B82F6"
                                isMobile={isMobile}
                            />
                            <StatCard
                                label="Completed Today"
                                value={approved || "0"}
                                subtext="Finished"
                                icon="checkmark-done-outline"
                                color="#10B981"
                                isMobile={isMobile}
                            />
                            <StatCard
                                label="Today's Revenue"
                                value={dailyRevenue || "₱0.00"}
                                subtext="Daily earnings"
                                icon="cash-outline"
                                color="#666"
                                isMobile={isMobile}
                            />
                            <StatCard
                                label="Total Revenue"
                                value={totalRevenue || "₱0.00"}
                                subtext="All-time"
                                icon="trending-up-outline"
                                color="#666"
                                isMobile={isMobile}
                            />
                        </View>
                    </ScrollView>
                )}
            </ManagerLayout>
        </>
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
    setupTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#0A0A1B",
        marginTop: 20,
        textAlign: "center",
    },
    setupSub: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    primaryButton: {
        backgroundColor: "#0A0A1B",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        width: "100%",
    },

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
