import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router"; // Added router import
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "../../../styles/studentStyles";

interface Order {
    id: number;
    file_name: string;
    status: string;
    total_price: string | number;
    print_shop_id: number;
    copies: number;
    pages: number;
    paper_size: string;
    color_mode: string;
    binding: string;
    notes?: string;
}

export default function OrdersScreen() {
    const [orders, setOrders] = useState<Order[]>([]); // Initialized as empty array
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) return;

            const response = await axiosInstance.get(`/student-orders/${userId}`);

            // Safety check: Ensure the data is actually an array before setting state
            if (response.data && Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setOrders([]); // Set to empty on error to prevent crashing
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchOrders();
    };

    const renderOrderItem = ({ item }: { item: any }) => {
        // Fallback status if missing
        const status = item.status || "pending";
        const isReady =
            status.toLowerCase() === "ready" || status.toLowerCase() === "completed";

        return (
            <View style={styles.orderCard}>
                <View style={styles.orderHeader}>
                    <View
                        style={[
                            styles.statusBadgeFull,
                            { backgroundColor: isReady ? "#00C853" : "#FF6D00" },
                        ]}
                    >
                        <Ionicons
                            name={isReady ? "cube" : "print"}
                            size={14}
                            color="white"
                        />
                        <Text style={styles.statusTextWhite}>{status.toUpperCase()}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={styles.orderPrice}>₱{item.total_price || "0.00"}</Text>
                        <Text style={styles.orderId}>#JOB-{item.id}</Text>
                    </View>
                </View>

                <Text style={styles.orderFileName}>
                    {item.file_name || "Untitled Document"}
                </Text>
                <Text style={styles.orderShopName}>Shop ID: {item.print_shop_id}</Text>

                <View style={styles.orderDetailGrid}>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Copies × Pages</Text>
                        <Text style={styles.detailValue}>
                            {item.copies} × {item.pages}
                        </Text>
                    </View>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Paper Size</Text>
                        <Text style={styles.detailValue}>{item.paper_size}</Text>
                    </View>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Color Mode</Text>
                        <Text style={styles.detailValue}>
                            {item.color_mode === "bw" ? "B&W" : "Color"}
                        </Text>
                    </View>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Binding</Text>
                        <Text style={styles.detailValue}>{item.binding}</Text>
                    </View>
                </View>

                {item.notes ? (
                    <View style={styles.notesBox}>
                        <Text style={styles.detailLabel}>My Notes:</Text>
                        <Text style={styles.notesText}>{item.notes}</Text>
                    </View>
                ) : null}
            </View>
        );
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FAFAFB",
                }}
            >
                <ActivityIndicator size="large" color="#0A0A1B" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FAFAFB" }}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                renderItem={renderOrderItem}
                contentContainerStyle={[styles.homePadding, { paddingBottom: 100 }]} // Extra padding for bottom nav
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListHeaderComponent={() => (
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.welcomeText}>My Orders</Text>
                        <Text style={styles.subWelcome}>
                            Track your print job submissions
                        </Text>
                    </View>
                )}
                // --- IMPROVED EMPTY STATE ---
                ListEmptyComponent={() => (
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 80,
                            paddingHorizontal: 40,
                        }}
                    >
                        <Ionicons name="document-text-outline" size={60} color="#DDD" />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: "#888",
                                marginTop: 15,
                            }}
                        >
                            No orders yet
                        </Text>
                        <Text style={{ color: "#AAA", textAlign: "center", marginTop: 8 }}>
                            You haven't submitted any print jobs. Tap 'Submit' to get started!
                        </Text>
                    </View>
                )}
            />

            {/* Fixed Bottom Navigation (Must be inside the main View but outside FlatList) */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/(tabs)/student/home")}
                >
                    <Ionicons name="home-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/(tabs)/student/submitJob")}
                >
                    <Ionicons name="cloud-upload-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItemActive}>
                    <Ionicons name="list" size={22} color="white" />
                    <Text style={styles.navTextActive}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/(tabs)/student/profile")}
                >
                    <Ionicons name="person-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
