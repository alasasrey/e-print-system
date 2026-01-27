//=====> REMEMBER: THIS FILE IS JUST A SUPABASE TEST CODE FOR REFERENCE DELETE THIS FILE IF DONE!!!!

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

// 1. Define your interface
interface Instrument {
    id: number;
    name: string;
}

export default function App() {
    // 2. Type your state and initialize with an empty array
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInstruments()
    }, [])

    async function getInstruments() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('instruments')
                .select('id, name'); // Specific selection is better

            if (error) throw error;

            // 3. Always fallback to an empty array to prevent FlatList crashes
            setInstruments(data || []);
        } catch (error) {
            console.error("Error fetching instruments:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={instruments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.item}>{item.name}</Text>
                    )}
                    // 4. Handle empty states gracefully
                    ListEmptyComponent={<Text>No instruments found.</Text>}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50, // Note: Use SafeAreaView instead of paddingTop for better device support
        paddingHorizontal: 16,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})