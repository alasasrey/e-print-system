import { Ionicons } from '@expo/vector-icons';
import React from "react";
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";

// Helper component for Nav Items
export const NavItems = ({ active }: { active: string }) => (
    <View>
        <TouchableOpacity style={{
            flexDirection: 'row', alignItems: 'center', padding: 12,
            backgroundColor: active === 'Dashboard' ? '#0A0A1B' : 'transparent',
            marginHorizontal: 10, borderRadius: 8
        }}>
            <Ionicons name="grid" size={20} color={active === 'Dashboard' ? "white" : "#666"} />
            <Text style={{ marginLeft: 12, color: active === 'Dashboard' ? 'white' : '#666', fontWeight: '600' }}>Dashboard</Text>
        </TouchableOpacity>
        {/* Add more items here following the same pattern */}
    </View>
);
