//TODO: PLEASE FIX THIS CODE!!!

import { ManagerLayout } from "@/components/ManagerLayout";
import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";

//TODO: PLEASE FIX THIS CODE!!!
//PLEASE FINISH THIS CODE!!!

export default function ManagerOrdersScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const [userId, setUserId] = useState();
    const [fileName, setFileName] = useState();
    const [fileUrl, setFileUrl] = useState();
    const [fileType, setFileType] = useState();
    const [pages, setPages] = useState();
    const [copies, setCopies] = useState();
    const [paperSize, setPaperSize] = useState();
    const [colorMode, setColorMode] = useState();
    const [orientation, setOrientation] = useState();
    const [binding, setBinding] = useState();
    const [notes, setNotes] = useState();
    const [status, setStatus] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axiosInstance.get(`/manager-orders`);

                // user_id 	 	file_name 	file_url 	file_type 	pages 	copies
                // paper_size 	color_mode 	orientation 	binding 	notes 	status 	payment_status
                // total_price

                setUserId(response?.data?.user_id);
                setFileName(response?.data?.file_name);
                setFileUrl(response?.data?.file_url);
                setFileType(response?.data?.file_type);
                setPages(response?.data?.pages);
                setCopies(response?.data?.copies);
                setPaperSize(response?.data?.paper_size);
                setColorMode(response?.data?.color_mode);
                setOrientation(response?.data?.orientation);
                setBinding(response?.data?.binding);
                setNotes(response?.data?.notes);
                setStatus(response?.data?.status);
                setPaymentStatus(response?.data?.payment_status);
                setTotalPrice(response?.data?.total_price);

                // console.log(`approved: ${response.data.user_id}`);
            } catch (err) {
                console.error("Error fetching manager order data:", err);
            }
        };
        getUserData();
    }, []);

    return (
        <ManagerLayout
            currentRoute="orders"
            title="Order Dashboard"
            subtitle="Review and track all print submissions"
        >
            <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
                <View
                    style={{
                        flexDirection: isMobile ? "column" : "row",
                        flexWrap: "wrap",
                        gap: 20,
                    }}
                >
                    {/* CASE 1: PENDING (New Request) */}
                    <OrderCard
                        status="Pending"
                        statusColor="#FFB020"
                        title="Thesis_v2_Final.pdf"
                        price="₱450.00"
                        orderId="ORD-2024-088"
                        details={{
                            pages: "1 x 150",
                            size: "Short",
                            mode: "Colored",
                            binding: "Hardbound",
                        }}
                        isMobile={isMobile}
                    />

                    {/* CASE 2: PROCESSING */}
                    <OrderCard
                        status="Processing"
                        statusColor="#3B82F6"
                        title="Project Presentation.pptx"
                        price="₱125.00"
                        orderId="ORD-2024-002"
                        details={{
                            pages: "3 x 15",
                            size: "A4",
                            mode: "B&W",
                            binding: "Staple",
                        }}
                        isMobile={isMobile}
                    />

                    {/* CASE 3: READY */}
                    <OrderCard
                        status="Ready"
                        statusColor="#10B981"
                        title="Research Paper - Final Draft.pdf"
                        price="₱185.50"
                        orderId="ORD-2024-001"
                        details={{
                            pages: "3 x 15",
                            size: "A4",
                            mode: "B&W",
                            binding: "Staple",
                        }}
                        isMobile={isMobile}
                    />
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

const OrderCard = ({
    status,
    statusColor,
    title,
    price,
    orderId,
    details,
    isMobile,
}: any) => {
    const isPending = status === "Pending";
    const isProcessing = status === "Processing";
    const isReady = status === "Ready";

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
                        <Text style={styles.declineText}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                        <Text style={styles.acceptText}>Accept Job</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View
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
                            ? "Customer has been notified."
                            : "Est. completion: Jan 10, 2:00 PM"}
                    </Text>
                </View>
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
