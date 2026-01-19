import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // Home Styles
    homeBg: { flex: 1, backgroundColor: "#FAFAFB" },
    homePadding: { padding: 20 },
    welcomeText: { fontSize: 24, fontWeight: "bold", color: "#000" },
    subWelcome: { fontSize: 14, color: "#666", marginBottom: 20 },
    row: { flexDirection: "row", gap: 15, marginBottom: 20 },
    mainActionCard: {
        flex: 1,
        backgroundColor: "#0F0F17",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
    },
    mainActionText: { color: "#fff", marginTop: 8, fontWeight: "600" },
    secondaryActionCard: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EEE",
    },
    secondaryActionText: { color: "#333", marginTop: 8, fontWeight: "600" },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEE",
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
        marginBottom: 25,
    },
    searchInput: { flex: 1, marginLeft: 10 },
    sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
    shopCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        marginBottom: 15,
    },
    shopName: { fontSize: 17, fontWeight: "600" },
    submitDocButton: {
        backgroundColor: "#0F0F17",
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
        marginTop: 15,
    },
    submitDocText: { color: "#fff", fontWeight: "600" },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        gap: 5,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    statusBadge: {
        backgroundColor: "#E8F5E9", // Light green background
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 10,
    },
    statusText: {
        fontSize: 12,
        color: "#2E7D32", // Dark green text
        fontWeight: "bold",
    },
    shopInfo: {
        fontSize: 13,
        color: "#777",
        marginTop: 10,
        lineHeight: 18,
    },

    // submitJob
    scrollContainer: {
        paddingBottom: 20,
    },
    formCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: "#EEE",
        marginBottom: 20,
    },
    fieldLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    subLabel: {
        fontSize: 12,
        color: "#888",
        marginBottom: 12,
    },
    smallLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#333",
        marginBottom: 5,
    },
    dropdownInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F5F5F7",
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        marginBottom: 15,
    },
    uploadBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderStyle: "dashed",
        gap: 10,
    },
    uploadText: {
        fontSize: 14,
        fontWeight: "500",
    },
    rowGap: {
        flexDirection: "row",
        gap: 15,
    },

    input: {
        backgroundColor: "#F5F5F7",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        color: "#000",
    },
    primaryButton: {
        backgroundColor: "#0F0F17", // Matching your theme
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        width: "100%",
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "none", // or 'uppercase' if you prefer
    },

    // Order Card Specific Styles
    orderCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#EEE",
        marginBottom: 25,
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    statusBadgeFull: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 6,
    },
    statusTextWhite: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    orderPrice: {
        fontSize: 18,
        fontWeight: "bold",
    },
    orderId: {
        fontSize: 12,
        color: "#888",
    },
    orderFileName: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
    },
    orderShopName: {
        fontSize: 15,
        color: "#888",
        marginBottom: 15,
    },
    orderDetailGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    detailCol: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 10,
        color: "#888",
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 11,
        fontWeight: "500",
        marginBottom: 10,
    },
    notesBox: {
        backgroundColor: "#F5F5F5",
        padding: 10,
        borderRadius: 4,
        marginBottom: 15,
    },
    notesText: {
        fontSize: 11,
        color: "#333",
    },
    infoBox: {
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 4,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    infoSubText: {
        fontSize: 13,
    },

    // Bottom Navigation Styles
    bottomNav: {
        flexDirection: "row",
        height: 70,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: 10,
    },
    navItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    navItemActive: {
        backgroundColor: "#0F0F17", // Dark navy from your image
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    navText: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
    },
    navTextActive: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
    },

    //SELECTION PRINT SHOP
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
    optionsContainer: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#EEE",
        ...Platform.select({
            android: { elevation: 5 },
            web: { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
        }),
    },
    // On Web, it stays small. On Android, it fills more width.
    webOptions: { width: 300 },
    mobileOptions: { width: "80%", maxHeight: "50%" },
    optionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F5F5F5",
    },
    optionText: { fontSize: 14, color: "#333" },
    selectedText: { fontWeight: "bold", color: "#0A0A1B" },

    //SELECTION
    container: { padding: 16 },
    selectedTextStyle: {
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        color: "#888",
    },
});
