import { ManagerLayout } from "@/components/ManagerLayout";
import { StatCard } from "@/components/statCard";
import { supabase } from "@/lib/supabase"; // Import your Supabase client
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";

// TODO: CHANGE THIS CODE TO THE SUPABASE CODE!!!!!

export default function ManagerDashboardScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    // State Management
    const [loading, setLoading] = useState(true);
    const [noShop, setNoShop] = useState(false);
    const [stats, setStats] = useState({
        pending: 0,
        processing: 0,
        ready: 0,
        approved: 0,
        dailyRevenue: 0,
        totalRevenue: 0,
    });

    const getUserData = useCallback(async () => {
        try {
            setLoading(true);

            // 1. Get the current Auth session (UUID)
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                router.replace("/login");
                return;
            }

            // 2. Check if a shop exists for this manager first
            const { data: shop, error: shopError } = await supabase
                .from('print_shops')
                .select('id')
                .eq('user_id', user.id)
                .maybeSingle(); // THE REASON WHY I USE THIS METHOD IS SO THAT WHEN THERE IS NO SHOP THERE NO ERROR

            if (shopError) {
                console.error("Shop Fetch Error:", shopError);
                return;
            }

            if (!shop) {
                setNoShop(true);
                setLoading(false); // Stop loading so the Setup Shop UI shows
                return;
            }
            // 3. Fetch stats from manager_dashboard table
            const { data: dashboardData, error: dbError } = await supabase
                .from('manager_dashboard')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle(); // Use maybeSingle instead of single

            if (dbError) {
                // If dashboard row doesn't exist yet, we just show zeros
                console.warn("No dashboard stats found for this user.");
            }

            // ADDED GUARD: Only update state if dashboardData is NOT null
            if (dashboardData) {
                setStats({
                    pending: dashboardData.pending ?? 0,
                    processing: dashboardData.processing ?? 0,
                    ready: dashboardData.ready ?? 0,
                    approved: dashboardData.approved ?? 0,
                    dailyRevenue: dashboardData.daily_revenue ?? 0,
                    totalRevenue: dashboardData.total_revenue ?? 0,
                });
            } else {
                // If null, stats remain at their initial state (all 0s)
                console.warn("Dashboard data is null, using default zeros.");
            }

            setNoShop(false);

        } catch (err) {
            console.error("Error fetching manager dashboard data:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    return (
        <ManagerLayout
            currentRoute="dashboard"
            title="Dashboard Overview"
            subtitle="Monitor your print shop performance"
        >
            {noShop ? (
                <View style={styles.setupContainer}>
                    <Ionicons name="storefront-outline" size={80} color="#0A0A1B" />
                    <Text style={styles.setupTitle}>Welcome to e-Print!</Text>
                    <Text style={styles.setupSub}>
                        You haven't set up your shop profile yet. Let's get your business started.
                    </Text>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => router.push("/(tabs)/manager/settings")}
                    >
                        <Text style={styles.buttonText}>Configure Shop Now</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        { padding: isMobile ? 15 : 30 }
                    ]}
                >
                    <View style={styles.statsGrid}>
                        <StatCard
                            label="Pending Approval"
                            value={stats?.pending}
                            subtext="Requires action"
                            icon="time-outline"
                            color="#FFB020"
                            isMobile={isMobile}
                        />
                        <StatCard
                            label="Active Jobs"
                            value={stats?.processing}
                            subtext="In progress"
                            icon="print-outline"
                            color="#10B981"
                            isMobile={isMobile}
                        />
                        <StatCard
                            label="Ready for Pickup"
                            value={stats?.ready}
                            subtext="Waiting"
                            icon="checkmark-circle-outline"
                            color="#3B82F6"
                            isMobile={isMobile}
                        />
                        <StatCard
                            label="Completed Today"
                            value={stats?.approved}
                            subtext="Finished"
                            icon="checkmark-done-outline"
                            color="#10B981"
                            isMobile={isMobile}
                        />
                        <StatCard
                            label="Today's Revenue"
                            value={stats?.dailyRevenue}
                            subtext="Daily earnings"
                            icon="cash-outline"
                            color="#666"
                            isMobile={isMobile}
                        />
                        <StatCard
                            label="Total Revenue"
                            value={stats?.totalRevenue}
                            subtext="All-time"
                            icon="trending-up-outline"
                            color="#666"
                            isMobile={isMobile}
                        />
                    </View>
                </ScrollView>
            )}
        </ManagerLayout>
    );

}


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    setupContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    scrollContent: {
        flexGrow: 1,
    },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start", // Changed from space-between for better grid alignment
        gap: 15,
    },
    setupTitle: {
        fontSize: 24,
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
        maxWidth: 400,
    },
    primaryButton: {
        backgroundColor: "#0A0A1B",
        height: 55,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        // Cross-platform shadow
        ...Platform.select({
            android: { elevation: 4 },
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            web: {
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
            },
        }),
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});