//TODO: PLEASE FIX THIS CODE!!!

import { ManagerLayout } from "@/components/ManagerLayout";
import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";

// //TODO: PLEASE FIX THIS CODE!!!
// //PLEASE FINISH THIS CODE!!!

interface Order {
    user_id: number;
    print_shop_id: number;
    file_name?: string;
    file_url?: string;
    file_type?: string;
    copies: number;
    pages: number;
    paper_size: string;
    color_mode: string;
    binding: string;
    notes?: string;
    status: string;
    payment_status: string | number;
    total_price: string | number;
}

const ORDER_STATUS_CONFIG: any = {
    pending: { label: "Pending", color: "#FFB020", icon: "alert-circle-outline" },
    processing: { label: "Processing", color: "#3B82F6", icon: "print-outline" },
    ready: { label: "Ready", color: "#10B981", icon: "cube-outline" },
    completed: {
        label: "Completed",
        color: "#059669",
        icon: "checkmark-done-circle-outline",
    },
    declined: {
        label: "Declined",
        color: "#FF5252",
        icon: "close-circle-outline",
    },
};

export default function ManagerOrdersScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId"); // Ensure you import AsyncStorage
            if (!userId) return;

            const response = await axiosInstance.get(`/manager-orders/${userId}`);
            setOrders(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Helper to determine color based on status
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "#FFB020";
            case "processing":
                return "#3B82F6";
            case "ready":
                return "#10B981";
            case "completed":
                return "#059669";
            default:
                return "#666";
        }
    };

    // --- NEW FUNCTION TO HANDLE API CALL ---
    const handleUpdateStatus = async (orderId: number, newStatus: string) => {
        try {
            // Adjust the endpoint based on your backend API
            await axiosInstance.put(`/update-order-status/${orderId}`, {
                status: newStatus,
            });

            // Refresh the list to show updated status
            fetchOrders();
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update order status.");
        }
    };

    const handleDecline = (orderId: number) => {
        Alert.alert(
            "Decline Order",
            "Are you sure you want to decline this job? This will notify the customer.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Decline",
                    style: "destructive",
                    onPress: () => handleUpdateStatus(orderId, "declined"),
                },
            ],
        );
    };

    return (
        // <ManagerLayout currentRoute="orders" title="Order Dashboard">
        //     <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
        //         <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 20 }}>
        //             {/* if the orders is greater than 0 then display it, else no orders */}
        //             {orders.length > 0 ? (
        //                 orders.map((order: any) => (
        //                     <OrderCard
        //                         key={order.id}
        //                         status={order.status}
        //                         statusColor={getStatusColor(order.status)}
        //                         title={order.file_name || "Untitled Job"}
        //                         price={`₱${parseFloat(order.total_price).toFixed(2)}`}
        //                         orderId={`ORD-${order.id}`}
        //                         details={{
        //                             pages: `${order.copies} x ${order.pages}`,
        //                             size: order.paper_size,
        //                             mode: order.color_mode,
        //                             binding: order.binding,
        //                         }}
        //                         isMobile={isMobile}
        //                     />
        //                 ))
        //             ) : (
        //                 <Text
        //                     style={{
        //                         textAlign: "center",
        //                         width: "100%",
        //                         marginTop: 50,
        //                         color: "#888",
        //                     }}
        //                 >
        //                     No orders found.
        //                 </Text>
        //             )}
        //         </View>
        //     </ScrollView>
        // </ManagerLayout>

        <ManagerLayout currentRoute="orders" title="Order Dashboard">
            <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 20 }}>
                    {orders.length > 0 ? (
                        orders.map((order: any) => (
                            <OrderCard
                                key={order.id}
                                id={order.id} // Pass the raw ID
                                status={order.status}
                                statusColor={getStatusColor(order.status)}
                                title={order.file_name || "Untitled Job"}
                                price={`₱${parseFloat(order.total_price).toFixed(2)}`}
                                orderId={`ORD-${order.id}`}
                                details={{
                                    pages: `${order.copies} x ${order.pages}`,
                                    size: order.paper_size,
                                    mode: order.color_mode,
                                    binding: order.binding,
                                }}
                                isMobile={isMobile}
                                onUpdateStatus={handleUpdateStatus} // Pass the function here
                            />
                        ))
                    ) : (
                        <Text
                            style={{
                                textAlign: "center",
                                width: "100%",
                                marginTop: 50,
                                color: "#888",
                            }}
                        >
                            No orders found.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </ManagerLayout>
    );
}

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

// const OrderCard = ({
//     id, // Make sure to receive the raw numeric ID
//     status,
//     statusColor,
//     title,
//     price,
//     orderId,
//     details,
//     isMobile,
//     onUpdateStatus, // Add this prop
// }: any) => {
//     const currentStatus = status?.toLowerCase();
//     const isPending = currentStatus === "pending";
//     const isProcessing = currentStatus === "processing";
//     const isReady = currentStatus === "ready";

//     return (
//         <View style={[styles.card, { width: isMobile ? "100%" : "48%" }]}>
//             {/* ... rest of your header code ... */}

//             <Text style={styles.title}>{title}</Text>

//             <View style={styles.detailsGrid}>
//                 <DetailItem label="Copies x Pages" value={details.pages} />
//                 <DetailItem label="Paper Size" value={details.size} />
//                 <DetailItem label="Color Mode" value={details.mode} />
//                 <DetailItem label="Binding" value={details.binding} />
//             </View>

//             {/* ACTION AREA */}
//             {isPending ? (
//                 <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
//                     <TouchableOpacity
//                         style={[styles.actionButton, styles.declineButton]}
//                         onPress={() => onUpdateStatus(id, "declined")} // CALL DECLINE
//                     >
//                         <Text style={styles.declineText}>Decline</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[styles.actionButton, styles.acceptButton]}
//                         onPress={() => onUpdateStatus(id, "processing")} // CALL ACCEPT
//                     >
//                         <Text style={styles.acceptText}>Accept Job</Text>
//                     </TouchableOpacity>
//                 </View>
//             ) : (
//                 <TouchableOpacity
//                     onPress={() => {
//                         // Logic to move from Processing -> Ready -> Completed
//                         if (isProcessing) onUpdateStatus(id, "ready");
//                         else if (isReady) onUpdateStatus(id, "completed");
//                     }}
//                     style={[
//                         styles.statusBox,
//                         {
//                             backgroundColor: isReady ? "#E8F9F1" : "#EBF5FF",
//                             borderColor: isReady ? "#C6F6D5" : "#BEE3F8",
//                         },
//                     ]}
//                 >
//                     <Text
//                         style={[
//                             styles.statusTitle,
//                             { color: isReady ? "#22543D" : "#2B6CB0" },
//                         ]}
//                     >
//                         {isReady ? "✓ Ready for Pickup" : "Printing in Progress..."}
//                     </Text>
//                     <Text style={styles.statusSub}>
//                         {isReady
//                             ? "Click to mark as Completed."
//                             : "Click to mark as Ready."}
//                     </Text>
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// };

const OrderCard = ({
    id, // Make sure to receive the raw numeric ID
    status,
    statusColor,
    title,
    price,
    orderId,
    details,
    isMobile,
    onUpdateStatus, // Add this prop
}: any) => {
    const currentStatus = status?.toLowerCase();
    const isPending = currentStatus === "pending";
    const isProcessing = currentStatus === "processing";
    const isReady = currentStatus === "ready";

    return (
        <View style={[styles.card, { width: isMobile ? "100%" : "48%" }]}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <View style={[styles.badge, { backgroundColor: statusColor }]}>
                    <Ionicons
                        name={
                            isPending
                                ? "alert-circle-outline"
                                : isProcessing
                                    ? "print-outline"
                                    : "cube-outline"
                        }
                        size={12}
                        color="white"
                    />
                    <Text style={styles.badgeText}>{status}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.orderId}>{orderId}</Text>
                </View>
            </View>

            <Text style={styles.title}>{title}</Text>

            <View style={styles.detailsGrid}>
                <DetailItem label="Copies x Pages" value={details.pages} />
                <DetailItem label="Paper Size" value={details.size} />
                <DetailItem label="Color Mode" value={details.mode} />
                <DetailItem label="Binding" value={details.binding} />
            </View>

            {/* ACTION AREA */}
            {isPending ? (
                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                    <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
                        <Text
                            style={styles.declineText}
                            onPress={() => onUpdateStatus(id, "declined")} // CALL DECLINE
                        >
                            Decline
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                        <Text
                            style={styles.acceptText}
                            onPress={() => onUpdateStatus(id, "processing")} // CALL ACCEPT
                        >
                            Accept Job
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // <View
                //     style={[
                //         styles.statusBox,
                //         {
                //             backgroundColor: isReady ? "#E8F9F1" : "#EBF5FF",
                //             borderColor: isReady ? "#C6F6D5" : "#BEE3F8",
                //         },
                //     ]}
                // >
                //     <Text
                //         style={[
                //             styles.statusTitle,
                //             { color: isReady ? "#22543D" : "#2B6CB0" },
                //         ]}
                //     >
                //         {isReady ? "✓ Ready for Pickup" : "Printing in Progress..."}
                //     </Text>
                //     <Text style={styles.statusSub}>
                //         {isReady
                //             ? "Customer has been notified."
                //             : "Est. completion: Jan 10, 2:00 PM"}
                //     </Text>
                // </View>

                <TouchableOpacity
                    onPress={() => {
                        // Logic to move from Processing -> Ready -> Completed
                        if (isProcessing) onUpdateStatus(id, "ready");
                        else if (isReady) onUpdateStatus(id, "completed");
                    }}
                    style={[
                        styles.statusBox,
                        {
                            backgroundColor: isReady ? "#E8F9F1" : "#EBF5FF",
                            borderColor: isReady ? "#C6F6D5" : "#BEE3F8",
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.statusTitle,
                            { color: isReady ? "#22543D" : "#2B6CB0" },
                        ]}
                    >
                        {isReady ? "✓ Ready for Pickup" : "Printing in Progress..."}
                    </Text>
                    <Text style={styles.statusSub}>
                        {isReady
                            ? "Click to mark as Completed."
                            : "Click to mark as Ready."}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const DetailItem = ({ label, value }: any) => (
    <View style={{ width: "25%", marginBottom: 10 }}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

// STYLES
const navStyles = StyleSheet.create({
    sidebar: {
        width: 250,
        backgroundColor: "#FFF",
        borderRightWidth: 1,
        borderRightColor: "#EEE",
        paddingTop: 20,
        height: "100%",
        zIndex: 100,
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
        marginBottom: 5,
    },
    activeItem: { backgroundColor: "#0A0A1B" },
    drawerText: { marginLeft: 12, fontWeight: "600" },
});

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: "#EEE",
        ...Platform.select({
            android: { elevation: 3 },
            web: { boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" },
        }),
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 4,
    },
    price: { fontSize: 20, fontWeight: "bold" },
    orderId: { fontSize: 12, color: "#888" },
    title: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
    detailsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        borderTopWidth: 1,
        borderTopColor: "#F5F5F5",
        paddingTop: 15,
        marginTop: 15,
    },
    detailLabel: { fontSize: 10, color: "#AAA" },
    detailValue: { fontSize: 12, fontWeight: "500" },
    actionButton: {
        flex: 1,
        height: 45,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },
    acceptButton: { backgroundColor: "#0A0A1B", borderColor: "#0A0A1B" },
    acceptText: { color: "white", fontWeight: "bold" },
    declineButton: { backgroundColor: "white", borderColor: "#EEE" },
    declineText: { color: "#FF5252", fontWeight: "bold" },
    statusBox: { marginTop: 15, padding: 15, borderRadius: 10, borderWidth: 1 },
    statusTitle: { fontWeight: "bold", fontSize: 14 },
    statusSub: { fontSize: 12, marginTop: 4, color: "#666" },
});
