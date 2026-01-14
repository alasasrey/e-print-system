import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from "react-native";

export default function ShopManagementScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={{ flex: 1, flexDirection: isMobile ? 'column' : 'row', backgroundColor: '#F8F9FA' }}>

            {/* SIDEBAR - WEB ONLY */}
            {!isMobile && (
                <View style={navStyles.sidebar}>
                    <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>E-Print</Text>
                        <Text style={{ fontSize: 12, color: '#888' }}>Admin Panel</Text>
                    </View>
                    <AdminNavItem label="Dashboard" icon="grid-outline" onPress={() => router.push("/admin/dashboard")} />
                    <AdminNavItem label="Shops" icon="business" active />
                    <AdminNavItem label="All Jobs" icon="document-text-outline" />
                </View>
            )}

            {/* MAIN CONTENT */}
            <View style={{ flex: 1 }}>
                <View style={navStyles.header}>
                    {isMobile && <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Shops</Text>}
                    <TouchableOpacity style={styles.createBtnHeader} onPress={() => { }}>
                        <Ionicons name="add" size={18} color="white" />
                        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>Create Shop</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Shop Management</Text>
                    <Text style={{ color: '#888', marginBottom: 20 }}>Manage and monitor print shop accounts</Text>

                    {/* TOP SUMMARY CARDS */}
                    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
                        <SummaryCard label="Total Shops" value="3" isMobile={isMobile} />
                        <SummaryCard label="Active Shops" value="3" color="#10B981" isMobile={isMobile} />
                        <SummaryCard label="Pending Approval" value="0" color="#FFB020" isMobile={isMobile} />
                    </View>

                    {/* SEARCH BAR */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search-outline" size={20} color="#AAA" />
                        <TextInput placeholder="Search shops by name, location, or email..." style={styles.searchInput} />
                    </View>

                    {/* SHOP LIST */}
                    <ShopCard
                        name="QuickPrint Express"
                        id="shop-1"
                        location="Main Campus Building A, Room 101"
                        contact="+63 923 456 7890"
                        email="quickprint@campus.edu"
                        rating="4.8"
                        hours="Mon-Fri: 8:00 AM - 6:00 PM"
                        types={['pdf', 'docx', 'jpg', 'png']}
                        isMobile={isMobile}
                    />

                    <ShopCard
                        name="Campus Copy Center"
                        id="shop-2"
                        location="Library Building, Ground Floor"
                        contact="+63 945 678 9012"
                        email="copycenter@campus.edu"
                        rating="4.5"
                        hours="Mon-Sat: 7:00 AM - 8:00 PM"
                        types={['pdf', 'docx', 'png']}
                        isMobile={isMobile}
                    />
                </ScrollView>
            </View>

            {/* MOBILE BOTTOM NAV */}
            {isMobile && (
                <View style={navStyles.bottomNav}>
                    <TouchableOpacity onPress={() => router.push("/admin/dashboard")}><Ionicons name="grid-outline" size={24} color="#888" /></TouchableOpacity>
                    <TouchableOpacity><Ionicons name="business" size={24} color="#0A0A1B" /></TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/admin/allJobs")}><Ionicons name="document-text-outline" size={24} color="#888" /></TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const ShopCard = ({ name, id, location, contact, email, rating, hours, types, isMobile }: any) => (
    <View style={styles.shopCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
                <Text style={{ fontSize: 12, color: '#888' }}>Shop ID: {id}</Text>
            </View>
            <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>ACTIVE</Text></View>
        </View>

        <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 20 }}>
            <View style={{ flex: 1 }}>
                <InfoLabel label="Location" value={location} icon="location-outline" />
                <InfoLabel label="Email" value={email} icon="mail-outline" />
                <InfoLabel label="Operating Hours" value={hours} icon="time-outline" />
            </View>
            <View style={{ flex: 1 }}>
                <InfoLabel label="Contact Number" value={contact} icon="call-outline" />
                <InfoLabel label="Rating" value={`⭐ ${rating}`} icon="star-outline" />
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.detailLabel}>Accepted File Types</Text>
                    <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
                        {types.map((t: string) => (
                            <View key={t} style={styles.typeBadge}><Text style={{ fontSize: 10 }}>{t}</Text></View>
                        ))}
                    </View>
                </View>
            </View>
        </View>

        <TouchableOpacity style={styles.suspendBtn}>
            <Ionicons name="remove-circle-outline" size={16} color="white" />
            <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>Suspend</Text>
        </TouchableOpacity>
    </View>
);

const SummaryCard = ({ label, value, color = '#000', isMobile }: any) => (
    <View style={[styles.summaryCard, { flex: 1 }]}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color }}>{value}</Text>
    </View>
);

const InfoLabel = ({ label, value, icon }: any) => (
    <View style={{ marginBottom: 10 }}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={{ fontSize: 13, color: '#333' }}>{value}</Text>
    </View>
);

const AdminNavItem = ({ label, icon, active, onPress }: any) => (
    <TouchableOpacity onPress={onPress} style={[navStyles.drawerItem, active && navStyles.activeItem]}>
        <Ionicons name={icon} size={20} color={active ? "white" : "#666"} />
        <Text style={[navStyles.drawerText, { color: active ? 'white' : '#666' }]}>{label}</Text>
    </TouchableOpacity>
);

const navStyles = StyleSheet.create({
    sidebar: { width: 250, backgroundColor: '#FFF', borderRightWidth: 1, borderRightColor: '#EEE', paddingTop: 20 },
    header: { height: 60, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    drawerItem: { flexDirection: 'row', alignItems: 'center', padding: 12, marginHorizontal: 10, borderRadius: 8, marginBottom: 5 },
    activeItem: { backgroundColor: '#0A0A1B' },
    drawerText: { marginLeft: 12, fontWeight: '600' },
    bottomNav: { flexDirection: 'row', height: 70, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'space-around', alignItems: 'center' }
});

const styles = StyleSheet.create({
    createBtnHeader: { backgroundColor: '#0A0A1B', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
    summaryCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#EEE' },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE', borderRadius: 8, paddingHorizontal: 15, marginBottom: 20 },
    searchInput: { flex: 1, height: 45, marginLeft: 10 },
    shopCard: { backgroundColor: 'white', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#EEE', marginBottom: 20 },
    detailLabel: { fontSize: 10, color: '#AAA', fontWeight: 'bold', marginBottom: 2 },
    activeBadge: { backgroundColor: '#E8F9F1', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    activeBadgeText: { color: '#10B981', fontSize: 10, fontWeight: 'bold' },
    typeBadge: { backgroundColor: '#F0F0F0', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
    suspendBtn: { backgroundColor: '#E02424', flexDirection: 'row', alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, marginTop: 20, alignItems: 'center' }
});