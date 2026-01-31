import { ManagerLayout } from "@/components/ManagerLayout";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from "react-native";

interface Order {
    id: number;
    user_id: string;
    file_name: string;
    copies: number;
    pages: number; // Added from your image reference
    status: string;
    total_price: number;
    student_name?: string;
    paper_size: string;
    color_mode: string;
    binding: string;
    notes: string;
    payment_status: string; // From screenshot
    file_url: string;
    print_shop_name: string;
}

export default function ManagerOrdersScreen() {
    const { width } = useWindowDimensions();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            // Fetch jobs and join with users table to get the name
            const { data, error } = await supabase
                .from('print_jobs')
                .select(`
                    *,
                    student:user_id ( fullname ), shop:print_shop_id ( name )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Map the joined data to our Order interface
            const formattedOrders = data.map((job: any) => ({
                ...job,
                // This will show the ID if student is null, helping you debug
                student_name: job.student?.fullname || `User (${job.user_id.slice(0, 5)}...)` || "Unknown Student",
                print_shop_name: job.shop?.name || `User (${job.print_shop_id.slice(0, 5)}...)` || "Unknown Shop",
            }));

            setOrders(formattedOrders);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const handleUpdateStatus = async (orderId: number, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('print_jobs')
                .update({ status: newStatus })
                .eq('id', orderId);
            if (error) throw error;
            fetchOrders();
        } catch (err) {
            Alert.alert("Error", "Failed to update status.");
        }
    };

    const showFullDetails = (order: Order) => {
        Alert.alert(
            "Order Specifications",
            `📄 File: ${order.file_name}\n📏 Size: ${order.paper_size}\n🎨 Mode: ${order.color_mode}\n🔗 Binding: ${order.binding}\n📝 Notes: ${order.notes || 'None'}`,
            [{ text: "Close" }]
        );
    };

    const openDetails = (order: Order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const getStatusStyles = (status: string) => {
        switch (status?.toLowerCase()) {
            case "pending": return { bg: "#FFF4E5", text: "#B76E00" };
            case "processing": return { bg: "#EBF5FF", text: "#3B82F6" };
            case "ready": return { bg: "#E8F9F1", text: "#10B981" };
            case "completed": return { bg: "#ECFDF5", text: "#059669" };
            case "declined": return { bg: "#FEE2E2", text: "#EF4444" };
            default: return { bg: "#F3F4F6", text: "#6B7280" };
        }
    };

    return (
        <ManagerLayout currentRoute="orders" title="Order Management">
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerSubtitle}>Manage all incoming and active print jobs.</Text>
                </View>

                <View style={styles.tableCard}>
                    <View style={styles.tableActionHeader}>
                        <Text style={styles.tableTitle}>Current Orders</Text>
                        <TouchableOpacity onPress={fetchOrders}>
                            <Text style={styles.refreshText}>Refresh</Text>
                        </TouchableOpacity>
                    </View>

                    {/* TABLE HEADER */}
                    <View style={styles.columnHeader}>
                        <Text style={[styles.columnHeaderText, { flex: 1 }]}>ID</Text>
                        <Text style={[styles.columnHeaderText, { flex: 2 }]}>STUDENT</Text>
                        <Text style={[styles.columnHeaderText, { flex: 2 }]}>JOB NAME</Text>
                        <Text style={[styles.columnHeaderText, { flex: 2 }]}>COPIES</Text>
                        <Text style={[styles.columnHeaderText, { flex: 1.5 }]}>STATUS</Text>
                        <Text style={[styles.columnHeaderText, { flex: 1 }]}>TOTAL</Text>
                        <Text style={[styles.columnHeaderText, { flex: 2.5, textAlign: 'center' }]}>ACTIONS</Text>
                    </View>

                    <ScrollView>
                        {loading ? (
                            <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 40 }} />
                        ) : orders.length > 0 ? (
                            orders.map((order) => {
                                const statusStyle = getStatusStyles(order.status);
                                const status = order.status.toLowerCase();

                                return (
                                    <View key={order.id} style={styles.row}>
                                        <Text style={[styles.cellText, { flex: 1 }]}>#{order.id}</Text>
                                        <Text style={[styles.cellText, { flex: 2, fontWeight: '600' }]}>{order.student_name}</Text>
                                        <Text style={[styles.cellText, { flex: 2 }]} numberOfLines={1}>{order.file_name}</Text>
                                        <Text style={[styles.cellText, { flex: 2 }]} numberOfLines={1}>{order.copies}</Text>

                                        <View style={{ flex: 1.5 }}>
                                            <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                                                <Text style={[styles.statusText, { color: statusStyle.text }]}>
                                                    {order.status.toUpperCase()}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text style={[styles.cellText, { flex: 1, fontWeight: 'bold', color: '#111827' }]}>
                                            ₱{Number(order.total_price).toFixed(2)}
                                        </Text>

                                        <View style={[styles.actionCell, { flex: 2.5 }]}>
                                            {/* Details is always visible */}
                                            <TouchableOpacity style={[styles.btn, styles.btnDetails]} onPress={() => openDetails(order)}>
                                                <Text style={styles.btnTextDetails}>View Details</Text>
                                            </TouchableOpacity>

                                            {/* Conditional Logic for workflow */}
                                            {status === 'pending' && (
                                                <>
                                                    <TouchableOpacity
                                                        style={[styles.btn, styles.btnApprove]}
                                                        onPress={() => handleUpdateStatus(order.id, 'processing')}
                                                    >
                                                        <Text style={styles.btnTextWhite}>Accept</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={[styles.btn, styles.btnReject]}
                                                        onPress={() => handleUpdateStatus(order.id, 'declined')}
                                                    >
                                                        <Text style={styles.btnTextWhite}>Reject</Text>
                                                    </TouchableOpacity>
                                                </>

                                            )}

                                            {status === 'processing' && (
                                                <TouchableOpacity
                                                    style={[styles.btn, styles.btnReady]}
                                                    onPress={() => handleUpdateStatus(order.id, 'ready')}
                                                >
                                                    <Text style={styles.btnTextWhite}>Mark Ready</Text>
                                                </TouchableOpacity>
                                            )}

                                        </View>
                                    </View>
                                );
                            })
                        ) : (
                            <Text style={styles.emptyText}>No orders found.</Text>
                        )}
                    </ScrollView>
                </View>


                {/* --- DETAILS MODAL --- */}
                <Modal visible={isModalVisible} transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <View>
                                    <Text style={styles.modalTitle}>View Details</Text>
                                    <Text style={styles.modalSubtitle}>This are the details</Text>
                                </View>
                                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                    <Text style={{ fontSize: 20 }}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.modalBody}>
                                {/* Left Column: Info */}
                                <View style={styles.modalColumn}>
                                    <Text style={styles.label}>Student Name</Text>
                                    <TextInput style={styles.input} value={selectedOrder?.student_name} editable={false} />

                                    <Text style={styles.label}>Shop Name</Text>
                                    <TextInput style={styles.input} value={selectedOrder?.print_shop_name} editable={false} />

                                    <Text style={styles.modalSectionTitle}>Print Configuration</Text>
                                    <View style={styles.rowGap}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.label}>Copies</Text>
                                            <TextInput style={styles.input} value={selectedOrder?.copies.toString()} editable={false} />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.label}>Pages</Text>
                                            <TextInput style={styles.input} value={selectedOrder?.pages?.toString() || "All"} editable={false} />
                                        </View>
                                    </View>

                                    <Text style={styles.label}>Paper Size</Text>
                                    <TextInput style={styles.input} value={selectedOrder?.paper_size} editable={false} />

                                    <Text style={styles.label}>Color</Text>
                                    <TextInput style={styles.input} value={selectedOrder?.color_mode} editable={false} />
                                </View>

                                {/* Right Column: File & Cost */}
                                <View style={[styles.modalColumn, { marginLeft: 20 }]}>
                                    <Text style={styles.label}>Uploaded Document</Text>
                                    <View style={styles.fileBox}>
                                        <Text style={{ flex: 1, fontSize: 12 }} numberOfLines={1}>{selectedOrder?.file_name}</Text>
                                        <TouchableOpacity>
                                            <Text style={{ color: '#3B82F6' }}>📥</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.priceContainer}>
                                        <Text style={styles.priceLabel}>Cost</Text>
                                        <Text style={styles.priceValue}>Php{Number(selectedOrder?.total_price).toFixed(2)}</Text>
                                    </View>

                                    <Text style={styles.label}>Payment Reference ID</Text>
                                    <TextInput style={styles.input} placeholder="Ref no. 123456789" />

                                    <Text style={styles.label}>Status</Text>
                                    <TextInput style={styles.input} value={selectedOrder?.payment_status?.toUpperCase()} editable={false} />

                                    <Text style={styles.label}>Notes</Text>
                                    <TextInput style={[styles.input, { height: 60 }]} multiline value={selectedOrder?.notes} editable={false} />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.modalOkBtn} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.modalOkText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        </ManagerLayout>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9FAFB", padding: 25 },
    headerRow: { marginBottom: 20 },
    headerSubtitle: { color: "#666", fontSize: 14 },
    tableCard: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingBottom: 10,
        flex: 1,
    },
    tableActionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        alignItems: "center",
    },
    tableTitle: { fontSize: 16, fontWeight: "600", color: "#374151" },
    refreshText: { color: "#666", fontSize: 13 },
    columnHeader: {
        flexDirection: "row",
        backgroundColor: "#F9FAFB",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
    },
    columnHeaderText: { fontSize: 11, fontWeight: "700", color: "#9CA3AF" },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    cellText: { fontSize: 13, color: "#4B5563" },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    statusText: { fontSize: 11, fontWeight: "600" },
    actionCell: { flexDirection: "row", justifyContent: "center", gap: 8 },
    btn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
    btnApprove: { backgroundColor: "#3B82F6" },
    btnReject: { backgroundColor: "#EF4444" },
    btnReady: { backgroundColor: "#3B82F6" },
    btnDetails: { backgroundColor: "#F3F4F6", borderWidth: 1, borderColor: "#E5E7EB" },
    btnTextWhite: { color: "white", fontSize: 11, fontWeight: "600" },
    btnTextDetails: { color: "#374151", fontSize: 11, fontWeight: "500" },
    emptyText: { textAlign: "center", padding: 40, color: "#9CA3AF" },

    // Modal Styles
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '70%', backgroundColor: 'white', borderRadius: 12, padding: 25 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    modalTitle: { fontSize: 20, fontWeight: '700' },
    modalSubtitle: { fontSize: 12, color: '#666' },
    modalBody: { flexDirection: 'row' },
    modalColumn: { flex: 1 },
    modalSectionTitle: { fontWeight: '700', marginTop: 15, marginBottom: 10, fontSize: 14 },
    label: { fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 5, marginTop: 10 },
    input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 6, padding: 8, fontSize: 13, backgroundColor: '#F9FAFB' },
    rowGap: { flexDirection: 'row', gap: 10 },
    fileBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', padding: 10, borderRadius: 8, backgroundColor: '#F9FAFB' },
    priceContainer: { alignItems: 'center', marginVertical: 20 },
    priceLabel: { fontSize: 12, color: '#666' },
    priceValue: { fontSize: 28, fontWeight: '800', color: '#3B82F6' },
    modalOkBtn: { backgroundColor: '#3B82F6', padding: 12, borderRadius: 8, marginTop: 25, alignItems: 'center' },
    modalOkText: { color: 'white', fontWeight: '700' }
});