import { AdminLayout } from '@/components/AdminLayout';
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from "react-native";

export default function AdminDashboardScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={{ flex: 1, flexDirection: isMobile ? 'column' : 'row', backgroundColor: '#F8F9FA' }}>
            <AdminLayout
                currentRoute="dashboard"
                title="System Overview"
                subtitle="Monitor platform-wide metrics and performance"
            >

                {/* MAIN CONTENT AREA */}
                <View style={{ flex: 1 }}>
                    {/* HEADER */}
                    {/* <View style={navStyles.header}>
                        {isMobile && <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Admin Overview</Text>}
                        <TouchableOpacity onPress={() => router.replace("/")} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="log-out-outline" size={20} color="#666" />
                            {!isMobile && <Text style={{ marginLeft: 5, color: '#666' }}>Logout</Text>}
                        </TouchableOpacity>
                    </View> */}

                    <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>

                        {/* TOP METRICS ROW */}
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15 }}>
                            <MetricCard label="Total Users" value="1" sub="Registered students" icon="people-outline" isMobile={isMobile} />
                            <MetricCard label="Print Shops" value="3/3" sub="Active / Total shops" icon="business-outline" isMobile={isMobile} />
                            <MetricCard label="Total Jobs" value="3" sub="+3 today" icon="document-outline" isMobile={isMobile} />
                            <MetricCard label="Total Revenue" value="₱0.00" sub="₱0.00 today" icon="cash-outline" isMobile={isMobile} />
                        </View>

                        {/* CHARTS / PERFORMANCE SECTION */}
                        <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 20, marginTop: 20 }}>

                            {/* JOB STATUS DISTRIBUTION */}
                            <View style={[styles.largeCard, { flex: 1 }]}>
                                <Text style={styles.cardTitle}>Job Status Distribution</Text>
                                <StatusRow label="Pending" count={1} color="#FFB020" />
                                <StatusRow label="Processing" count={1} color="#8B5CF6" />
                                <StatusRow label="Ready" count={0} color="#10B981" />
                                <StatusRow label="Completed" count={0} color="#10B981" />
                            </View>

                            {/* SHOP PERFORMANCE */}
                            <View style={[styles.largeCard, { flex: 1.5 }]}>
                                <Text style={styles.cardTitle}>Shop Performance</Text>
                                <ShopRow name="QuickPrint Express" revenue="₱0.00" jobs={0} />
                                <ShopRow name="Campus Copy Center" revenue="₱0.00" jobs={0} />
                                <ShopRow name="Student Print Hub" revenue="₱0.00" jobs={0} />
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </AdminLayout>


        </View>
    );
}

const MetricCard = ({ label, value, sub, icon, isMobile }: any) => (
    <View style={[styles.metricCard, { width: isMobile ? '47%' : '23.5%' }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.metricLabel}>{label}</Text>
            <Ionicons name={icon} size={16} color="#AAA" />
        </View>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricSub}>{sub}</Text>
    </View>
);

const StatusRow = ({ label, count, color }: any) => (
    <View style={styles.rowItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={styles.rowLabel}>{label}</Text>
        </View>
        <Text style={styles.rowCount}>{count}</Text>
    </View>
);

const ShopRow = ({ name, revenue, jobs }: any) => (
    <View style={styles.rowItem}>
        <View>
            <Text style={styles.rowLabel}>{name}</Text>
            <Text style={styles.metricSub}>{jobs} jobs completed</Text>
        </View>
        <Text style={styles.rowCount}>{revenue}</Text>
    </View>
);

const AdminNavItem = ({ label, icon, active }: any) => (
    <TouchableOpacity style={[navStyles.drawerItem, active && navStyles.activeItem]}>
        <Ionicons name={icon} size={20} color={active ? "white" : "#666"} />
        <Text style={[navStyles.drawerText, { color: active ? 'white' : '#666' }]}>{label}</Text>
    </TouchableOpacity>
);

const navStyles = StyleSheet.create({
    sidebar: { width: 250, backgroundColor: '#FFF', borderRightWidth: 1, borderRightColor: '#EEE', paddingTop: 20 },
    header: { height: 60, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    drawerItem: { flexDirection: 'row', alignItems: 'center', padding: 12, marginHorizontal: 10, borderRadius: 8, marginBottom: 5 },
    activeItem: { backgroundColor: '#0A0A1B' },
    drawerText: { marginLeft: 12, fontWeight: '600' },
    bottomNav: { flexDirection: 'row', height: 70, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'space-around', alignItems: 'center' }
});

const styles = StyleSheet.create({
    metricCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#EEE' },
    metricLabel: { fontSize: 12, color: '#666', fontWeight: '500' },
    metricValue: { fontSize: 22, fontWeight: 'bold', marginVertical: 4 },
    metricSub: { fontSize: 10, color: '#AAA' },
    largeCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 20, borderWidth: 1, borderColor: '#EEE' },
    cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
    rowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    dot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
    rowLabel: { fontSize: 14, color: '#333' },
    rowCount: { fontSize: 14, fontWeight: 'bold' }
});