import { NavItems } from "@/components/navItems";
import { StatCard } from "@/components/statCard";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from "react-native";

export default function ManagerDashboardScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768; // Standard breakpoint or screen size for mobile/tablet

    return (
        <View style={{ flex: 1, flexDirection: isMobile ? 'column' : 'row', backgroundColor: '#F8F9FA' }}>

            {/* SIDEBAR - Only visible on Web/Desktop */}
            {!isMobile && (
                <View style={{
                    width: 250,
                    backgroundColor: '#FFFFFF',
                    borderRightWidth: 1,
                    borderRightColor: '#EEE',
                    paddingTop: 20
                }}>
                    <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>E-Print</Text>
                        <Text style={{ fontSize: 12, color: '#888' }}>Shop Manager</Text>
                    </View>
                    <TouchableOpacity>
                        <NavItems active="Dashboard" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/manager/orders")}>
                        <NavItems active="Orders" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/manager/settings")}>
                        <NavItems active="Settings" />
                    </TouchableOpacity>
                </View>
            )}

            {/* MAIN CONTENT AREA */}
            <View style={{ flex: 1 }}>
                {/* HEADER */}
                <View style={{
                    height: 60,
                    backgroundColor: '#FFF',
                    flexDirection: 'row',
                    justifyContent: isMobile ? 'space-between' : 'flex-end',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#EEE'
                }}>
                    {isMobile && <Text style={{ fontWeight: 'bold', fontSize: 18 }}>E-Print</Text>}
                    <TouchableOpacity onPress={() => router.replace("/")} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="log-out-outline" size={20} color="#666" />
                        {!isMobile && <Text style={{ marginLeft: 5, color: '#666' }}>Logout</Text>}
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
                    <Text style={{ fontSize: isMobile ? 20 : 24, fontWeight: 'bold', marginBottom: 5 }}>Dashboard Overview</Text>
                    <Text style={{ color: '#888', marginBottom: 25 }}>Monitor your print shop performance</Text>

                    {/* STAT CARDS GRID - Responsive Columns */}
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}>
                        <StatCard label="Pending Approval" value="1" subtext="Requires action" icon="time-outline" color="#FFB020" isMobile={isMobile} />
                        <StatCard label="Active Jobs" value="2" subtext="In progress" icon="print-outline" color="#10B981" isMobile={isMobile} />
                        <StatCard label="Ready for Pickup" value="0" subtext="Waiting" icon="checkmark-circle-outline" color="#3B82F6" isMobile={isMobile} />
                        <StatCard label="Completed Today" value="0" subtext="Finished" icon="checkmark-done-outline" color="#10B981" isMobile={isMobile} />
                        <StatCard label="Today's Revenue" value="₱0.00" subtext="Daily earnings" icon="cash-outline" color="#666" isMobile={isMobile} />
                        <StatCard label="Total Revenue" value="₱0.00" subtext="All-time" icon="trending-up-outline" color="#666" isMobile={isMobile} />
                    </View>
                </ScrollView>
            </View>

            {/* MOBILE BOTTOM NAV - Only visible on Android/iOS */}
            {isMobile && (
                <View style={{
                    flexDirection: 'row',
                    height: 70,
                    backgroundColor: '#FFF',
                    borderTopWidth: 1,
                    borderTopColor: '#EEE',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Ionicons name="grid" size={24} color="#0A0A1B" />
                        <Text style={{ fontSize: 10, marginTop: 4 }}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push("/manager/orders")}>
                        <Ionicons name="list-outline" size={24} color="#888" />
                        <Text style={{ fontSize: 10, marginTop: 4 }}>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push("/manager/settings")}>
                        <Ionicons name="settings-outline" size={24} color="#888" />
                        <Text style={{ fontSize: 10, marginTop: 4 }}>Settings</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}


