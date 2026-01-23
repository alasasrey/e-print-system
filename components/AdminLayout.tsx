import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

interface AdminLayoutProps {
    children: React.ReactNode;
    currentRoute: "dashboard" | "shops" | "allJobs";
    title: string;
    subtitle?: string;
}

export const AdminLayout = ({
    children,
    currentRoute,
    title,
    subtitle,
}: AdminLayoutProps) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View
            style={{
                flex: 1,
                flexDirection: isMobile ? "column" : "row",
                backgroundColor: "#F8F9FA",
            }}
        >
            {/* SIDEBAR - Desktop */}
            {!isMobile && (
                <View style={navStyles.sidebar}>
                    <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>E-Print</Text>
                        <Text style={{ fontSize: 12, color: '#888' }}>Admin Panel</Text>
                    </View>

                    <SidebarItem
                        icon="grid"
                        label="Dashboard"
                        active={currentRoute === "dashboard"}
                        onPress={() => router.push("/(tabs)/admin/dashboard")}
                    />
                    <SidebarItem
                        icon="business-outline"
                        label="Shops"
                        active={currentRoute === "shops"}
                        onPress={() => router.push("/(tabs)/admin/shops")}
                    />
                    <SidebarItem
                        icon="document-text-outline"
                        label="All Jobs"
                        active={currentRoute === "allJobs"}
                        onPress={() => router.push("/(tabs)/admin/allJobs")}
                    />
                </View>
            )}

            {/* MAIN CONTENT AREA */}
            <View style={{ flex: 1 }}>
                {/* HEADER */}
                <View style={navStyles.header}>
                    {isMobile && (
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>E-Print</Text>
                    )}
                    <TouchableOpacity
                        onPress={() => router.replace("/")}
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#666" />
                        {/* {!isMobile && (
                            <Text style={{ marginLeft: 5, color: "#666" }}>Logout</Text>
                        )} */}
                        <Text style={{ marginLeft: 5, color: "#666" }}>Logout</Text>
                    </TouchableOpacity>
                    {/* {isMobile && <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Shops</Text>} */}
                    {currentRoute === 'shops' && <TouchableOpacity style={styles.createBtnHeader} onPress={() => { }}>
                        <Ionicons name="add" size={18} color="white" />
                        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>Create Shop</Text>
                    </TouchableOpacity>}
                    {/* {isMobile && <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Order Management</Text>} */}
                </View>

                <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
                    <Text
                        style={{
                            fontSize: isMobile ? 20 : 24,
                            fontWeight: "bold",
                            marginBottom: 5,
                        }}
                    >
                        {title}
                    </Text>
                    {subtitle && (
                        <Text style={{ color: "#888", marginBottom: 25 }}>{subtitle}</Text>
                    )}

                    {children}
                </ScrollView>
            </View>

            {/* MOBILE BOTTOM NAV */}
            {isMobile && (
                <View style={navStyles.bottomNav}>
                    <MobileNavItem
                        icon={currentRoute === "dashboard" ? "grid" : "grid-outline"}
                        label="Dashboard"
                        active={currentRoute === "dashboard"}
                        onPress={() => router.push("/(tabs)/admin/dashboard")}
                    />
                    <MobileNavItem
                        icon={currentRoute === "shops" ? "business" : "business-outline"}
                        label="Shops"
                        active={currentRoute === "shops"}
                        onPress={() => router.push("/(tabs)/admin/shops")}
                    />
                    <MobileNavItem
                        icon={currentRoute === "allJobs" ? "document-text" : "document-text-outline"}
                        label="All Jobs"
                        active={currentRoute === "allJobs"}
                        onPress={() => router.push("/(tabs)/admin/allJobs")}
                    />
                </View>
            )}
        </View>
    );
};

const AdminNavItem = ({ label, icon, active }: any) => (
    <TouchableOpacity style={[navStyles.drawerItem, active && navStyles.activeItem]}>
        <Ionicons name={icon} size={20} color={active ? "white" : "#666"} />
        <Text style={[navStyles.drawerText, { color: active ? 'white' : '#666' }]}>{label}</Text>
    </TouchableOpacity>
);

// Sub-components for internal use
const SidebarItem = ({ icon, label, onPress, active }: any) => (
    <TouchableOpacity
        onPress={onPress}
        style={[navStyles.drawerItem, active && navStyles.activeItem]}
    >
        <Ionicons name={icon} size={20} color={active ? "white" : "#666"} />
        <Text style={[navStyles.drawerText, { color: active ? "white" : "#666" }]}>
            {label}
        </Text>
    </TouchableOpacity>
);

const MobileNavItem = ({ icon, label, onPress, active }: any) => (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
        <Ionicons name={icon} size={24} color={active ? "#0A0A1B" : "#888"} />
        <Text
            style={{ fontSize: 10, marginTop: 4, color: active ? "#0A0A1B" : "#888" }}
        >
            {label}
        </Text>
    </TouchableOpacity>
);

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
    drawerText: { marginLeft: 12, fontWeight: "600" },
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


