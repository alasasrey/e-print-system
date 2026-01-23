import { AdminLayout } from '@/components/AdminLayout';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";

export default function OrderManagementScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <AdminLayout
            currentRoute="allJobs"
            title="Order Management"
            subtitle="View and manage incoming print jobs"
        >
            <View style={{ flex: 1, flexDirection: isMobile ? 'column' : 'row', backgroundColor: '#F8F9FA' }}>


                {/* SIDEBAR - WEB ONLY */}
                {/* {!isMobile && (
                <View style={navStyles.sidebar}>
                    <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>E-Print</Text>
                        <Text style={{ fontSize: 12, color: '#888' }}>Shop Manager</Text>
                    </View>
                    <TouchableOpacity style={navStyles.drawerItem} onPress={() => router.push("/manager/dashboard")}>
                        <Ionicons name="grid-outline" size={20} color="#666" />
                        <Text style={navStyles.drawerText}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[navStyles.drawerItem, navStyles.activeItem]}>
                        <Ionicons name="list" size={20} color="white" />
                        <Text style={[navStyles.drawerText, { color: 'white' }]}>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={navStyles.drawerItem} onPress={() => router.push("/manager/settings")}>
                        <Ionicons name="settings-outline" size={20} color="#666" />
                        <Text style={navStyles.drawerText}>Settings</Text>
                    </TouchableOpacity>
                </View>
            )} */}

                {/* MAIN CONTENT */}
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>

                        {/* SEARCH & FILTER BAR */}
                        <View style={styles.filterContainer}>
                            <View style={styles.searchBox}>
                                <Ionicons name="search-outline" size={18} color="#AAA" />
                                <TextInput
                                    placeholder="Search by student, filename, or job ID..."
                                    style={styles.searchInput}
                                />
                            </View>
                            <TouchableOpacity style={styles.filterButton}>
                                <Ionicons name="filter-outline" size={18} color="#666" />
                                <Text style={{ marginHorizontal: 8 }}>All Status</Text>
                                <Ionicons name="chevron-down" size={16} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {/* ORDER LIST */}
                        <OrderListItem
                            fileName="Research_Paper_Final.pdf"
                            student="John Student"
                            jobId="job-1"
                            status="PROCESSING"
                            statusColor="#8B5CF6"
                            details={{ pages: "3 x 15", size: "A4", mode: "B&W", binding: "Staple" }}
                            submitted="Jan 08, 10:30"
                            payment="PAID"
                            cost="₱45.50"
                            notes="Please bind on the left side"
                            actions={['Mark as Ready', 'Chat with Student']}
                            isMobile={isMobile}
                        />

                        <OrderListItem
                            fileName="Presentation_Slides.pptx"
                            student="Sarah Lee"
                            jobId="job-3"
                            status="PENDING"
                            statusColor="#FFB020"
                            details={{ pages: "1 x 20", size: "A4", mode: "Color", binding: "None" }}
                            submitted="Jan 08, 15:10"
                            payment="UNPAID"
                            cost="₱80.00"
                            notes="Need by tomorrow morning"
                            actions={['Approve', 'Reject', 'Chat with Student']}
                            isMobile={isMobile}
                        />
                    </ScrollView>
                </View>

                {/* MOBILE NAV */}
                {isMobile && (
                    <View style={navStyles.bottomNav}>
                        <TouchableOpacity onPress={() => router.push("/admin/dashboard")}><Ionicons name="grid-outline" size={24} color="#888" /></TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/admin/shops")}><Ionicons name="business" size={24} color="#888" /></TouchableOpacity>
                        <TouchableOpacity><Ionicons name="document-text-outline" size={24} color="#0A0A1B" /></TouchableOpacity>
                    </View>
                )}
            </View>
        </AdminLayout>

    );
}

const OrderListItem = ({ fileName, student, jobId, status, statusColor, details, submitted, payment, cost, notes, actions, isMobile }: any) => (
    <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="document-text-outline" size={20} color="#444" />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.fileName}>{fileName}</Text>
                    <Text style={styles.studentSub}>Student: {student} • Job #{jobId}</Text>
                </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                <Text style={styles.statusText}>{status}</Text>
            </View>
        </View>

        {/* DETAILS GRID */}
        <View style={[styles.detailsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
            <DetailGroup label="Copies x Pages" value={details.pages} />
            <DetailGroup label="Paper Size" value={details.size} />
            <DetailGroup label="Color Mode" value={details.mode} />
            <DetailGroup label="Binding" value={details.binding} />
        </View>

        <View style={[styles.detailsRow, { flexDirection: isMobile ? 'column' : 'row', borderTopWidth: 0 }]}>
            <DetailGroup label="Submitted" value={submitted} />
            <DetailGroup label="Payment" value={payment} valueColor={payment === 'PAID' ? '#10B981' : '#666'} />
            <DetailGroup label="Cost" value={cost} />
        </View>

        {/* STUDENT NOTES */}
        {notes && (
            <View style={styles.notesBox}>
                <Text style={styles.notesLabel}>Student Notes:</Text>
                <Text style={styles.notesText}>{notes}</Text>
            </View>
        )}

        {/* ACTION BUTTONS */}
        <View style={styles.actionRow}>
            {actions.map((action: string) => (
                <TouchableOpacity
                    key={action}
                    style={[
                        styles.btn,
                        action === 'Approve' || action === 'Mark as Ready' ? styles.btnPrimary : styles.btnSecondary,
                        action === 'Reject' && styles.btnDanger
                    ]}
                >
                    {action === 'Mark as Ready' && <Ionicons name="checkmark-circle-outline" size={16} color="white" style={{ marginRight: 5 }} />}
                    {action === 'Approve' && <Ionicons name="checkmark-outline" size={16} color="white" style={{ marginRight: 5 }} />}
                    <Text style={[
                        styles.btnText,
                        action === 'Chat with Student' ? { color: '#000' } : { color: 'white' },
                        action === 'Reject' && { color: 'white' }
                    ]}>{action}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

const DetailGroup = ({ label, value, valueColor = '#000' }: any) => (
    <View style={{ flex: 1, marginBottom: 10 }}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[styles.detailValue, { color: valueColor }]}>{value}</Text>
    </View>
);

const navStyles = StyleSheet.create({
    sidebar: { width: 250, backgroundColor: '#FFF', borderRightWidth: 1, borderRightColor: '#EEE', paddingTop: 20 },
    header: { height: 60, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    drawerItem: { flexDirection: 'row', alignItems: 'center', padding: 12, marginHorizontal: 10, borderRadius: 8 },
    activeItem: { backgroundColor: '#0A0A1B' },
    drawerText: { marginLeft: 12, fontWeight: '600' },
    bottomNav: { flexDirection: 'row', height: 70, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'space-around', alignItems: 'center' }
});

const styles = StyleSheet.create({
    filterContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE', borderRadius: 8, paddingHorizontal: 15 },
    searchInput: { height: 45, flex: 1, marginLeft: 10 },
    filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE', borderRadius: 8, paddingHorizontal: 15 },
    orderCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
    fileName: { fontSize: 16, fontWeight: 'bold' },
    studentSub: { fontSize: 12, color: '#888', marginTop: 2 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    statusText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
    detailsRow: { paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#F5F5F5' },
    detailLabel: { fontSize: 10, color: '#AAA', marginBottom: 4 },
    detailValue: { fontSize: 13, fontWeight: '500' },
    notesBox: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 8, marginBottom: 20 },
    notesLabel: { fontSize: 11, color: '#666', fontWeight: 'bold' },
    notesText: { fontSize: 12, color: '#444', marginTop: 4 },
    actionRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
    btn: { paddingHorizontal: 15, height: 38, borderRadius: 6, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    btnPrimary: { backgroundColor: '#0A0A1B' },
    btnSecondary: { backgroundColor: 'white', borderWidth: 1, borderColor: '#EEE' },
    btnDanger: { backgroundColor: '#E02424' },
    btnText: { fontSize: 12, fontWeight: 'bold' }
});