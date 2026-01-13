import { Ionicons } from '@expo/vector-icons';
import React from "react";
import {
    Platform,
    Text,
    View
} from "react-native";

// Helper component for Stat Cards
export const StatCard = ({ label, value, subtext, icon, color, isMobile }: any) => (
    <View style={{
        width: isMobile ? '48%' : '31%', // 2 columns on mobile, 3 on web
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#EEE',
        ...Platform.select({
            android: { elevation: 3 },
            web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }
        })
    }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#666', flexShrink: 1 }}>{label}</Text>
            <Ionicons name={icon} size={16} color={color} />
        </View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000' }}>{value}</Text>
        <Text style={{ fontSize: 10, color: '#AAA', marginTop: 4 }}>{subtext}</Text>
    </View>
);