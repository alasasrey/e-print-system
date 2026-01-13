import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    cardStyle: {
        width: '31%', // Creates a 3-column grid
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        // Shadow for elevation
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

    cardLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333'
    },

    cardValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 5
    },

    cardSubtext: {
        fontSize: 12,
        color: '#888'
    },
})