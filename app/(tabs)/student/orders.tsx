import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../styles/studentStyles";

//TODO: THIS IS JUST A TEST REMOVE THIS CODE AND 
// USE A DATABASE AND SERVER FOR A REAL TEST!!!
const orders = [
    {
        id: "ORD-2024-001",
        fileName: "Research Paper - Final Draft.pdf",
        shop: "QuickPrint Express",
        status: "Ready",
        price: "185.50",
        details: { copies: "3", pages: "15", size: "A4", color: "B&W", binding: "Staple" },
        payment: "PAID",
        cost: "45.50",
        notes: "Please bind on the left side",
        message: "Ready for Pickup",
        subMessage: "Please proceed to QuickPrint Express to collect your documents"
    },
    {
        id: "ORD-2024-002",
        fileName: "Project Presentation.pptx",
        shop: "Campus Copy Center",
        status: "Processing",
        price: "125.00",
        details: { copies: "3", pages: "15", size: "A4", color: "B&W", binding: "Staple" },
        payment: "PAID",
        cost: "45.50",
        notes: "Please bind on the left side",
        message: "Your order is being printed",
        subMessage: "Est. ready: Jan 9, 11:00 PM"
    }
];

export default function OrdersScreen() {
    const renderOrderItem = ({ item }: { item: typeof orders[0] }) => {
        const isReady = item.status === "Ready";

        return (
            <View style={styles.orderCard}>
                {/* Header Row */}
                <View style={styles.orderHeader}>
                    <View style={[styles.statusBadgeFull, { backgroundColor: isReady ? '#00C853' : '#FF6D00' }]}>
                        <Ionicons name={isReady ? "cube" : "print"} size={14} color="white" />
                        <Text style={styles.statusTextWhite}>{item.status}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.orderPrice}>₱{item.price}</Text>
                        <Text style={styles.orderId}>{item.id}</Text>
                    </View>
                </View>

                <Text style={styles.orderFileName}>{item.fileName}</Text>
                <Text style={styles.orderShopName}>{item.shop}</Text>

                {/* Detail Grid */}
                <View style={styles.orderDetailGrid}>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Copies × Pages</Text>
                        <Text style={styles.detailValue}>{item.details.copies} × {item.details.pages}</Text>
                        <Text style={styles.detailLabel}>Submitted</Text>
                        <Text style={styles.detailValue}>Jan 08, 10:30</Text>
                    </View>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Paper Size</Text>
                        <Text style={styles.detailValue}>{item.details.size}</Text>
                        <Text style={styles.detailLabel}>Payment</Text>
                        <Text style={[styles.detailValue, { color: '#00C853', fontWeight: 'bold' }]}>{item.payment}</Text>
                    </View>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Color Mode</Text>
                        <Text style={styles.detailValue}>{item.details.color}</Text>
                        <Text style={styles.detailLabel}>Cost</Text>
                        <Text style={styles.detailValue}>₱{item.cost}</Text>
                    </View>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Binding</Text>
                        <Text style={styles.detailValue}>{item.details.binding}</Text>
                    </View>
                </View>

                {/* Notes Section */}
                <View style={styles.notesBox}>
                    <Text style={styles.detailLabel}>Student Notes:</Text>
                    <Text style={styles.notesText}>{item.notes}</Text>
                </View>

                {/* Status Message Box */}
                <View style={[styles.infoBox, {
                    backgroundColor: isReady ? '#E8F5E9' : '#E3F2FD',
                    borderColor: isReady ? '#A5D6A7' : '#BBDEFB'
                }]}>
                    <View style={styles.infoRow}>
                        {isReady && <Ionicons name="checkmark-sharp" size={18} color="#2E7D32" />}
                        <Text style={[styles.infoTitle, { color: isReady ? '#2E7D32' : '#1565C0' }]}>
                            {item.message}
                        </Text>
                    </View>
                    <Text style={[styles.infoSubText, { color: isReady ? '#2E7D32' : '#1565C0' }]}>
                        {item.subMessage}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFB' }}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderItem}
                contentContainerStyle={styles.homePadding}
                ListHeaderComponent={() => (
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.welcomeText}>My Orders</Text>
                        <Text style={styles.subWelcome}>Track your print job submissions</Text>
                    </View>
                )}
            />

            {/* Fixed Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/home")}>
                    <Ionicons name="home-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/submitJob")}>
                    <Ionicons name="cloud-upload-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItemActive}>
                    <Ionicons name="list" size={22} color="white" />
                    <Text style={styles.navTextActive}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/profile")}>
                    <Ionicons name="person-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}