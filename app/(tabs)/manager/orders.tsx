import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from "react-native";

export default function ManagerOrdersScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <View style={{ flex: 1, flexDirection: isMobile ? 'column' : 'row', backgroundColor: '#F8F9FA' }}>

            {/* SIDEBAR - WEB ONLY */}
            {!isMobile && (
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
                </View>
            )}

            {/* MAIN CONTENT */}
            <View style={{ flex: 1 }}>
                <View style={navStyles.header}>
                    {isMobile && <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Orders</Text>}
                    <TouchableOpacity onPress={() => router.replace("/")} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="log-out-outline" size={20} color="#666" />
                        {!isMobile && <Text style={{ marginLeft: 5, color: '#666' }}>Logout</Text>}
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>Manage Orders</Text>
                    <Text style={{ color: '#888', marginBottom: 25 }}>Track and update print job submissions</Text>

                    {/* ORDER LIST - RESPONSIVE GRID */}
                    <View style={{ flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: 20 }}>

                        {/* ORDER CARD 1 - READY STATE */}
                        <OrderCard
                            status="Ready"
                            statusColor="#10B981"
                            title="Research Paper - Final Draft.pdf"
                            price="₱185.50"
                            orderId="ORD-2024-001"
                            shop="QuickPrint Express"
                            details={{ pages: "3 x 15", size: "A4", mode: "B&W", binding: "Staple" }}
                            pickupText="Ready for Pickup"
                            pickupSub="Please proceed to QuickPrint Express to collect your documents"
                            isMobile={isMobile}
                        />

                        {/* ORDER CARD 2 - PROCESSING STATE */}
                        <OrderCard
                            status="Processing"
                            statusColor="#FF8000"
                            title="Project Presentation.pptx"
                            price="₱125.00"
                            orderId="ORD-2024-002"
                            shop="Campus Copy Center"
                            details={{ pages: "3 x 15", size: "A4", mode: "B&W", binding: "Staple" }}
                            pickupText="Your order is being printed"
                            pickupSub="Est. ready: Jan 9, 11:00 PM"
                            isProcessing
                            isMobile={isMobile}
                        />
                    </View>
                </ScrollView>
            </View>

            {/* MOBILE NAV */}
            {isMobile && (
                <View style={navStyles.bottomNav}>
                    <TouchableOpacity onPress={() => router.push("/manager/dashboard")}><Ionicons name="grid-outline" size={24} color="#888" /></TouchableOpacity>
                    <TouchableOpacity><Ionicons name="list" size={24} color="#0A0A1B" /></TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/manager/settings")}><Ionicons name="settings-outline" size={24} color="#888" /></TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const OrderCard = ({ status, statusColor, title, price, orderId, shop, details, pickupText, pickupSub, isProcessing, isMobile }: any) => (
    <View style={[styles.card, { width: isMobile ? '100%' : '48%' }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={[styles.badge, { backgroundColor: statusColor }]}>
                <Ionicons name={status === 'Ready' ? "cube-outline" : "print-outline"} size={12} color="white" />
                <Text style={styles.badgeText}>{status}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.orderId}>{orderId}</Text>
            </View>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.shopName}>{shop}</Text>

        {/* DETAILS GRID */}
        <View style={styles.detailsGrid}>
            <DetailItem label="Copies x Pages" value={details.pages} />
            <DetailItem label="Paper Size" value={details.size} />
            <DetailItem label="Color Mode" value={details.mode} />
            <DetailItem label="Binding" value={details.binding} />
        </View>

        {/* STATUS BOX */}
        <View style={[styles.statusBox, { backgroundColor: isProcessing ? '#EBF5FF' : '#E8F9F1', borderColor: isProcessing ? '#BEE3F8' : '#C6F6D5' }]}>
            <Text style={[styles.statusTitle, { color: isProcessing ? '#2B6CB0' : '#22543D' }]}>
                {status === 'Ready' && '✓ '} {pickupText}
            </Text>
            <Text style={[styles.statusSub, { color: isProcessing ? '#2B6CB0' : '#22543D' }]}>{pickupSub}</Text>
        </View>
    </View>
);

const DetailItem = ({ label, value }: any) => (
    <View style={{ width: '25%', marginBottom: 10 }}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const navStyles = StyleSheet.create({
    sidebar: { width: 250, backgroundColor: '#FFF', borderRightWidth: 1, borderRightColor: '#EEE', paddingTop: 20 },
    header: { height: 60, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    drawerItem: { flexDirection: 'row', alignItems: 'center', padding: 12, marginHorizontal: 10, borderRadius: 8 },
    activeItem: { backgroundColor: '#0A0A1B' },
    drawerText: { marginLeft: 12, color: '#666', fontWeight: '600' },
    bottomNav: { flexDirection: 'row', height: 70, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'space-around', alignItems: 'center' }
});

const styles = StyleSheet.create({
    card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#EEE', ...Platform.select({ android: { elevation: 3 }, web: { boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' } }) },
    badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
    price: { fontSize: 20, fontWeight: 'bold' },
    orderId: { fontSize: 12, color: '#888' },
    title: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    shopName: { fontSize: 14, color: '#666', marginBottom: 15 },
    detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 15 },
    detailLabel: { fontSize: 10, color: '#AAA' },
    detailValue: { fontSize: 12, fontWeight: '500' },
    statusBox: { marginTop: 15, padding: 15, borderRadius: 10, borderWidth: 1 },
    statusTitle: { fontWeight: 'bold', fontSize: 14 },
    statusSub: { fontSize: 12, marginTop: 4 }
});


// TODO: PLEASE MERGE THE THE PENDING W/ DECLINE AND ACCEPT UI IN THIS CODE

// import { Ionicons } from '@expo/vector-icons';
// import { router } from "expo-router";
// import React from "react";
// import {
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//     useWindowDimensions
// } from "react-native";

// export default function ManagerOrdersScreen() {
//     const { width } = useWindowDimensions();
//     const isMobile = width < 768;

//     return (
//         <View style={{ flex: 1, flexDirection: isMobile ? 'column' : 'row', backgroundColor: '#F8F9FA' }}>

//             {/* SIDEBAR - WEB ONLY */}
//             {!isMobile && (
//                 <View style={navStyles.sidebar}>
//                     <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
//                         <Text style={{ fontWeight: 'bold', fontSize: 18 }}>E-Print</Text>
//                         <Text style={{ fontSize: 12, color: '#888' }}>Shop Manager</Text>
//                     </View>
//                     <TouchableOpacity style={navStyles.drawerItem} onPress={() => router.push("/manager/dashboard")}>
//                         <Ionicons name="grid-outline" size={20} color="#666" />
//                         <Text style={navStyles.drawerText}>Dashboard</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={[navStyles.drawerItem, navStyles.activeItem]}>
//                         <Ionicons name="list" size={20} color="white" />
//                         <Text style={[navStyles.drawerText, { color: 'white' }]}>Orders</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}

//             {/* MAIN CONTENT */}
//             <View style={{ flex: 1 }}>
//                 <View style={navStyles.header}>
//                     {isMobile && <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Pending Orders</Text>}
//                     <TouchableOpacity onPress={() => router.replace("/")} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Ionicons name="log-out-outline" size={20} color="#666" />
//                         {!isMobile && <Text style={{ marginLeft: 5, color: '#666' }}>Logout</Text>}
//                     </TouchableOpacity>
//                 </View>

//                 <ScrollView contentContainerStyle={{ padding: isMobile ? 15 : 30 }}>
//                     <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>Order Requests</Text>
//                     <Text style={{ color: '#888', marginBottom: 25 }}>Review incoming print jobs before processing</Text>

//                     <View style={{ flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: 20 }}>

//                         {/* PENDING ORDER CARD */}
//                         <OrderCard
//                             status="Pending"
//                             statusColor="#FFB020"
//                             title="Thesis_v2_Final.pdf"
//                             price="₱450.00"
//                             orderId="ORD-2024-088"
//                             shop="QuickPrint Express"
//                             details={{ pages: "1 x 150", size: "Short", mode: "Colored", binding: "Hardbound" }}
//                             isPending={true}
//                             isMobile={isMobile}
//                         />

//                         {/* ANOTHER PENDING ORDER */}
//                         <OrderCard
//                             status="Pending"
//                             statusColor="#FFB020"
//                             title="Activity_Sheet_Math.pdf"
//                             price="₱15.00"
//                             orderId="ORD-2024-092"
//                             shop="QuickPrint Express"
//                             details={{ pages: "10 x 1", size: "A4", mode: "B&W", binding: "None" }}
//                             isPending={true}
//                             isMobile={isMobile}
//                         />
//                     </View>
//                 </ScrollView>
//             </View>

//             {/* MOBILE NAV */}
//             {isMobile && (
//                 <View style={navStyles.bottomNav}>
//                     <TouchableOpacity onPress={() => router.push("/manager/dashboard")}><Ionicons name="grid-outline" size={24} color="#888" /></TouchableOpacity>
//                     <TouchableOpacity><Ionicons name="list" size={24} color="#0A0A1B" /></TouchableOpacity>
//                     <TouchableOpacity onPress={() => router.push("/manager/settings")}><Ionicons name="settings-outline" size={24} color="#888" /></TouchableOpacity>
//                 </View>
//             )}
//         </View>
//     );
// }

// const OrderCard = ({ status, statusColor, title, price, orderId, shop, details, isPending, isMobile }: any) => (
//     <View style={[styles.card, { width: isMobile ? '100%' : '48%' }]}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//             <View style={[styles.badge, { backgroundColor: statusColor }]}>
//                 <Ionicons name="alert-circle-outline" size={12} color="white" />
//                 <Text style={styles.badgeText}>{status}</Text>
//             </View>
//             <View style={{ alignItems: 'flex-end' }}>
//                 <Text style={styles.price}>{price}</Text>
//                 <Text style={styles.orderId}>{orderId}</Text>
//             </View>
//         </View>

//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.shopName}>{shop}</Text>

//         <View style={styles.detailsGrid}>
//             <DetailItem label="Copies x Pages" value={details.pages} />
//             <DetailItem label="Paper Size" value={details.size} />
//             <DetailItem label="Color Mode" value={details.mode} />
//             <DetailItem label="Binding" value={details.binding} />
//         </View>

//         {/* ACTION BUTTONS FOR PENDING ORDERS */}
//         {isPending && (
//             <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
//                 <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
//                     <Text style={styles.declineText}>Decline</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
//                     <Text style={styles.acceptText}>Accept Job</Text>
//                 </TouchableOpacity>
//             </View>
//         )}
//     </View>
// );

// const DetailItem = ({ label, value }: any) => (
//     <View style={{ width: '25%', marginBottom: 10 }}>
//         <Text style={styles.detailLabel}>{label}</Text>
//         <Text style={styles.detailValue}>{value}</Text>
//     </View>
// );

// const navStyles = StyleSheet.create({
//     sidebar: { width: 250, backgroundColor: '#FFF', borderRightWidth: 1, borderRightColor: '#EEE', paddingTop: 20 },
//     header: { height: 60, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
//     drawerItem: { flexDirection: 'row', alignItems: 'center', padding: 12, marginHorizontal: 10, borderRadius: 8 },
//     activeItem: { backgroundColor: '#0A0A1B' },
//     drawerText: { marginLeft: 12, color: '#666', fontWeight: '600' },
//     bottomNav: { flexDirection: 'row', height: 70, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'space-around', alignItems: 'center' }
// });

// const styles = StyleSheet.create({
//     card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#EEE', ...Platform.select({ android: { elevation: 3 }, web: { boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' } }) },
//     badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
//     badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
//     price: { fontSize: 20, fontWeight: 'bold' },
//     orderId: { fontSize: 12, color: '#888' },
//     title: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
//     shopName: { fontSize: 14, color: '#666', marginBottom: 15 },
//     detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 15 },
//     detailLabel: { fontSize: 10, color: '#AAA' },
//     detailValue: { fontSize: 12, fontWeight: '500' },
//     actionButton: { flex: 1, height: 45, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
//     acceptButton: { backgroundColor: '#0A0A1B', borderColor: '#0A0A1B' },
//     acceptText: { color: 'white', fontWeight: 'bold' },
//     declineButton: { backgroundColor: 'white', borderColor: '#EEE' },
//     declineText: { color: '#FF5252', fontWeight: 'bold' }
// });