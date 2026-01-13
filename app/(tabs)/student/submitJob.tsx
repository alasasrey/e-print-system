import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../../styles/studentStyles";

export default function SubmitJobScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFB' }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.homePadding}>
                    <Text style={styles.welcomeText}>Submit Print Job</Text>
                    <Text style={styles.subWelcome}>Upload your document and configure print settings</Text>

                    {/* Section 1: Select Print Shop */}
                    <View style={styles.formCard}>
                        <Text style={styles.fieldLabel}>Select Print Shop</Text>
                        <Text style={styles.subLabel}>Choose where you want to print</Text>
                        <TouchableOpacity style={styles.dropdownInput}>
                            <Text style={{ color: '#888' }}>Select a print shop</Text>
                            <Ionicons name="chevron-down" size={18} color="#888" />
                        </TouchableOpacity>
                    </View>

                    {/* Section 2: Upload Document */}
                    <View style={styles.formCard}>
                        <Text style={styles.fieldLabel}>Upload Document</Text>
                        <Text style={styles.subLabel}>PDF, DOC, DOCX, PPT, or images (max 50MB)</Text>
                        <TouchableOpacity style={styles.uploadBox}>
                            <Ionicons name="cloud-upload-outline" size={20} color="#333" />
                            <Text style={styles.uploadText}>Choose File</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Section 3: Print Specifications */}
                    <View style={styles.formCard}>
                        <Text style={styles.fieldLabel}>Print Specifications</Text>
                        <Text style={styles.subLabel}>Configure your printing preferences</Text>

                        <View style={styles.rowGap}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Number of Pages</Text>
                                <TextInput style={styles.input} value="1" keyboardType="numeric" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Copies</Text>
                                <TextInput style={styles.input} value="1" keyboardType="numeric" />
                            </View>
                        </View>

                        <View style={styles.rowGap}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Paper Size</Text>
                                <TouchableOpacity style={styles.dropdownInput}>
                                    <Text>A4</Text>
                                    <Ionicons name="chevron-down" size={16} color="#888" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Color Mode</Text>
                                <TouchableOpacity style={styles.dropdownInput}>
                                    <Text>Black & White</Text>
                                    <Ionicons name="chevron-down" size={16} color="#888" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.rowGap}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Orientation</Text>
                                <TouchableOpacity style={styles.dropdownInput}>
                                    <Text>Portrait</Text>
                                    <Ionicons name="chevron-down" size={16} color="#888" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Binding</Text>
                                <TouchableOpacity style={styles.dropdownInput}>
                                    <Text>None</Text>
                                    <Ionicons name="chevron-down" size={16} color="#888" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.smallLabel}>Additional Notes (Optional)</Text>
                        <TextInput
                            style={[styles.input, { height: 60, textAlignVertical: 'top' }]}
                            placeholder="Any special instructions..."
                            multiline
                        />
                    </View>

                    <TouchableOpacity style={[styles.primaryButton, { marginBottom: 40 }]}>
                        <Text style={styles.primaryButtonText}>Submit Document</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* FIXED BOTTOM NAVIGATION */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/home")}>
                    <Ionicons name="home-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItemActive}>
                    <Ionicons name="cloud-upload" size={22} color="white" />
                    <Text style={styles.navTextActive}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/orders")}>
                    <Ionicons name="list-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/profile")}>
                    <Ionicons name="person-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}