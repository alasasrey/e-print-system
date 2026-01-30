import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/studentStyles";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


// TODO: CHANGE THIS CODE TO THE SUPABASE CODE!!!!!

export default function HomeScreen() {
    const [fullname, setFullname] = useState('');
    const [loading, setLoading] = useState(false);

    //REMEMBER: USE useEffect(()=>{}, []); FOR GET AND POST REQUEST AND TO MAKE SURE IT RUNS ONCE ONLY 
    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);

                // 1. Get the current authenticated user session
                const { data: { user }, error: authError } = await supabase.auth.getUser();

                if (authError || !user) throw authError;

                // 2. Fetch profile details from your custom 'e_print_users' table
                // We use .eq('id', user.id) assuming you linked them via UUID
                const { data, error, status } = await supabase
                    .from('e_print_users')
                    .select('fullname')
                    .eq('supabase_user_id', user.id)
                    .single();

                if (error && status !== 406) throw error;

                if (data) {
                    setFullname(data.fullname);
                }
            } catch (err: any) {
                console.error("Error fetching user fullname:", err.message);
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.homeBg}>
                <View style={styles.homePadding}>
                    <Text style={styles.welcomeText}>Welcome, {fullname}!</Text>
                    <Text style={styles.subWelcome}>Find print shops and submit your documents</Text>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.mainActionCard} onPress={() => router.push("/(tabs)/student/submitJob")}>
                            <Ionicons name="cloud-upload-outline" size={24} color="white" />
                            <Text style={styles.mainActionText}>Submit Job</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryActionCard} onPress={() => router.push("/(tabs)/student/orders")}>
                            <Ionicons name="document-text-outline" size={24} color="#333" />
                            <Text style={styles.secondaryActionText}>My Orders</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={18} color="#888" />
                        <TextInput placeholder="Search for print shops..." style={styles.searchInput} />
                    </View>

                    <Text style={styles.sectionTitle}>Available Print Shops</Text>

                    <View style={styles.shopCard}>
                        <Text style={styles.shopName}>QuickPrint Express</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Text style={styles.ratingText}>4.8</Text>
                            <View style={styles.statusBadge}><Text style={styles.statusText}>active</Text></View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="location" size={12} color="#666" />
                            <Text style={styles.shopInfo}>Main Campus Building A, Room 101</Text>
                        </View>
                        <TouchableOpacity style={styles.submitDocButton} onPress={() => router.push("/(tabs)/student/submitJob")}>
                            <Text style={styles.submitDocText}>Submit Document</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItemActive}>
                    <Ionicons name="home" size={24} color="white" />
                    <Text style={styles.navTextActive}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/submitJob")}>
                    <Ionicons name="cloud-upload-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/orders")}>
                    <Ionicons name="list" size={24} color="#888" />
                    <Text style={styles.navText}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/profile")}>
                    <Ionicons name="person-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}