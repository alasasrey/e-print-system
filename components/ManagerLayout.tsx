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

interface ManagerLayoutProps {
    children: React.ReactNode;
    currentRoute: "dashboard" | "orders" | "settings";
    title: string;
    subtitle?: string;
}

export const ManagerLayout = ({
    children,
    currentRoute,
    title,
    subtitle,
}: ManagerLayoutProps) => {
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
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>E-Print</Text>
                        <Text style={{ fontSize: 12, color: "#888" }}>Shop Manager</Text>
                    </View>

                    <SidebarItem
                        icon="grid-outline"
                        label="Dashboard"
                        active={currentRoute === "dashboard"}
                        onPress={() => router.push("/manager/dashboard")}
                    />
                    <SidebarItem
                        icon="list"
                        label="Orders"
                        active={currentRoute === "orders"}
                        onPress={() => router.push("/manager/orders")}
                    />
                    <SidebarItem
                        icon="settings-outline"
                        label="Settings"
                        active={currentRoute === "settings"}
                        onPress={() => router.push("/manager/settings")}
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
                        {!isMobile && (
                            <Text style={{ marginLeft: 5, color: "#666" }}>Logout</Text>
                        )}
                    </TouchableOpacity>
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
                        onPress={() => router.push("/manager/dashboard")}
                    />
                    <MobileNavItem
                        icon={currentRoute === "orders" ? "list" : "list-outline"}
                        label="Orders"
                        active={currentRoute === "orders"}
                        onPress={() => router.push("/manager/orders")}
                    />
                    <MobileNavItem
                        icon={currentRoute === "settings" ? "settings" : "settings-outline"}
                        label="Settings"
                        active={currentRoute === "settings"}
                        onPress={() => router.push("/manager/settings")}
                    />
                </View>
            )}
        </View>
    );
};

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
