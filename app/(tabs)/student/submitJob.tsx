// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as DocumentPicker from 'expo-document-picker';
// import { router } from "expo-router";
// import React, { useState } from "react";
// import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { styles } from "../../../styles/studentStyles";

// export default function SubmitJobScreen() {

//     // Inside your SubmitJobScreen function:
//     const [file, setFile] = useState<any>(null);
//     const [printShop, setPrintShop] = useState("Main Campus Library");
//     const [pages, setPages] = useState("1");
//     const [copies, setCopies] = useState("1");
//     const [notes, setNotes] = useState("");

//     const pickDocument = async () => {
//         let result = await DocumentPicker.getDocumentAsync({
//             type: ["application/pdf", "image/*", "application/msword"],
//         });

//         if (!result.canceled) {
//             setFile(result.assets[0]);
//         }
//     };

//     const handleSubmit = async () => {
//         if (!file) {
//             Alert.alert("Error", "Please upload a document first");
//             return;
//         }

//         try {
//             const userId = await AsyncStorage.getItem("userId"); // Ensure you save this on Login
//             const formData = new FormData();

//             // Append file
//             formData.append('file', {
//                 uri: file.uri,
//                 name: file.name,
//                 type: file.mimeType,
//             } as any);

//             // Append other fields
//             formData.append('userId', userId || "1");
//             formData.append('printShop', printShop);
//             formData.append('pages', pages);
//             formData.append('copies', copies);
//             formData.append('notes', notes);

//             const response = await axios.post(`http://192.168.1.4:3000/submit-job`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             Alert.alert("Success", "Job submitted successfully!");
//             router.push("/(tabs)/student/orders");
//         } catch (error) {
//             Alert.alert("Error", "Failed to submit job");
//         }
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: '#FAFAFB' }}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.homePadding}>
//                     <Text style={styles.welcomeText}>Submit Print Job</Text>
//                     <Text style={styles.subWelcome}>Upload your document and configure print settings</Text>

//                     {/* Section 1: Select Print Shop */}
//                     <View style={styles.formCard}>
//                         <Text style={styles.fieldLabel}>Select Print Shop</Text>
//                         <Text style={styles.subLabel}>Choose where you want to print</Text>
//                         <TouchableOpacity style={styles.dropdownInput}>
//                             <Text style={{ color: '#888' }}>Select a print shop</Text>
//                             <Ionicons name="chevron-down" size={18} color="#888" />
//                         </TouchableOpacity>
//                     </View>

//                     {/* Section 2: Upload Document */}
//                     <View style={styles.formCard}>
//                         <Text style={styles.fieldLabel}>Upload Document</Text>
//                         <Text style={styles.subLabel}>PDF, DOC, DOCX, PPT, or images (max 50MB)</Text>
//                         <TouchableOpacity style={styles.uploadBox}>
//                             <Ionicons name="cloud-upload-outline" size={20} color="#333" />
//                             <Text style={styles.uploadText}>Choose File</Text>
//                         </TouchableOpacity>
//                     </View>

//                     {/* Section 3: Print Specifications */}
//                     <View style={styles.formCard}>
//                         <Text style={styles.fieldLabel}>Print Specifications</Text>
//                         <Text style={styles.subLabel}>Configure your printing preferences</Text>

//                         <View style={styles.rowGap}>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Number of Pages</Text>
//                                 <TextInput value={pages}
//                                     onChangeText={setPages} style={styles.input} placeholder='1' keyboardType="numeric" />
//                             </View>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Copies</Text>
//                                 <TextInput value={copies}
//                                     onChangeText={setCopies} style={styles.input} placeholder='1' keyboardType="numeric" />
//                             </View>
//                         </View>

//                         <View style={styles.rowGap}>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Paper Size</Text>
//                                 <TouchableOpacity style={styles.dropdownInput}>
//                                     <Text>A4</Text>
//                                     <Ionicons name="chevron-down" size={16} color="#888" />
//                                 </TouchableOpacity>
//                             </View>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Color Mode</Text>
//                                 <TouchableOpacity style={styles.dropdownInput}>
//                                     <Text>Black & White</Text>
//                                     <Ionicons name="chevron-down" size={16} color="#888" />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>

//                         <View style={styles.rowGap}>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Orientation</Text>
//                                 <TouchableOpacity style={styles.dropdownInput}>
//                                     <Text>Portrait</Text>
//                                     <Ionicons name="chevron-down" size={16} color="#888" />
//                                 </TouchableOpacity>
//                             </View>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Binding</Text>
//                                 <TouchableOpacity style={styles.dropdownInput}>
//                                     <Text>None</Text>
//                                     <Ionicons name="chevron-down" size={16} color="#888" />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>

//                         <Text style={styles.smallLabel}>Additional Notes (Optional)</Text>
//                         <TextInput
//                             style={[styles.input, { height: 60, textAlignVertical: 'top' }]}
//                             placeholder="Any special instructions..."
//                             multiline
//                         />
//                     </View>

//                     <TouchableOpacity style={[styles.primaryButton, { marginBottom: 40 }]}>
//                         <Text style={styles.primaryButtonText}>Submit Document</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>

//             {/* FIXED BOTTOM NAVIGATION */}
//             <View style={styles.bottomNav}>
//                 <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/home")}>
//                     <Ionicons name="home-outline" size={22} color="#888" />
//                     <Text style={styles.navText}>Home</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.navItemActive}>
//                     <Ionicons name="cloud-upload" size={22} color="white" />
//                     <Text style={styles.navTextActive}>Submit</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/orders")}>
//                     <Ionicons name="list-outline" size={22} color="#888" />
//                     <Text style={styles.navText}>Orders</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/student/profile")}>
//                     <Ionicons name="person-outline" size={22} color="#888" />
//                     <Text style={styles.navText}>Profile</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }


import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../../styles/studentStyles";


export default function SubmitJobScreen() {
    // --- State Variables ---
    const [printShop, setPrintShop] = useState("");
    const [file, setFile] = useState<any>(null);
    const [pages, setPages] = useState("1");
    const [copies, setCopies] = useState("1");

    // The specific ones you requested:
    const [paperSize, setPaperSize] = useState("A4");
    const [colorMode, setColorMode] = useState("Black & White");
    const [orientation, setOrientation] = useState("Portrait");
    const [binding, setBinding] = useState("None");
    const [notes, setNotes] = useState("");

    // Helper function to create a simple selection menu
    const selectOption = (title: string, options: string[], setter: (val: string) => void) => {
        Alert.alert(
            title,
            `Select an option:`,
            options.map(opt => ({
                text: opt,
                onPress: () => setter(opt)
            })),
            { cancelable: true }
        );
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: ["application/pdf", "image/*", "application/msword"],
        });
        if (!result.canceled) setFile(result.assets[0]);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFB' }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.homePadding}>
                    <Text style={styles.welcomeText}>Submit Print Job</Text>

                    {/* Section 1: Select Print Shop */}
                    <View style={styles.formCard}>
                        <Text style={styles.fieldLabel}>Select Print Shop</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Library, Comp Lab"
                            value={printShop}
                            onChangeText={setPrintShop}
                        />
                    </View>

                    {/* Section 2: Upload */}
                    <View style={styles.formCard}>
                        <Text style={styles.fieldLabel}>Upload Document</Text>
                        <Text style={styles.subLabel}>PDF, DOC, DOCX, PPT, or images (max 50MB)</Text>
                        <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
                            <Ionicons name="cloud-upload-outline" size={20} color="#333" />
                            <Text style={styles.uploadText}>{file ? file.name : "Choose File"}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Section 3: Specifications */}
                    <View style={styles.formCard}>
                        <Text style={styles.fieldLabel}>Print Specifications</Text>

                        {/* Pages & Copies Row */}
                        <View style={styles.rowGap}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Number of Pages</Text>
                                <TextInput style={styles.input} value={pages} onChangeText={setPages} keyboardType="numeric" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Copies</Text>
                                <TextInput style={styles.input} value={copies} onChangeText={setCopies} keyboardType="numeric" />
                            </View>
                        </View>

                        {/* Paper Size & Color Mode Row */}
                        <View style={styles.rowGap}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Paper Size</Text>
                                <TouchableOpacity
                                    style={styles.dropdownInput}
                                    onPress={() => selectOption("Paper Size", ["A4", "Letter", "Legal"], setPaperSize)}
                                >
                                    <Text>{paperSize}</Text>
                                    <Ionicons name="chevron-down" size={16} color="#888" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Color Mode</Text>
                                <TouchableOpacity
                                    style={styles.dropdownInput}
                                    onPress={() => selectOption("Color Mode", ["Black & White", "Colored"], setColorMode)}
                                >
                                    <Text>{colorMode}</Text>
                                    <Ionicons name="chevron-down" size={16} color="#888" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Orientation & Binding Row */}
                        <View style={styles.rowGap}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Orientation</Text>
                                <TouchableOpacity
                                    style={styles.dropdownInput}
                                    onPress={() => selectOption("Orientation", ["Portrait", "Landscape"], setOrientation)}
                                >
                                    <Text>{orientation}</Text>
                                    <Ionicons name="chevron-down" size={16} color="#888" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Binding</Text>
                                <TouchableOpacity
                                    style={styles.dropdownInput}
                                    onPress={() => selectOption("Binding", ["None", "Stapled", "Ring Bound"], setBinding)}
                                >
                                    <Text>{binding}</Text>
                                    <Ionicons name="chevron-down" size={16} color="#888" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.smallLabel}>Notes</Text>
                        <TextInput
                            style={[styles.input, { height: 60 }]}
                            multiline
                            value={notes}
                            onChangeText={setNotes}
                            placeholder="Special instructions..."
                        />
                    </View>

                    <TouchableOpacity style={styles.primaryButton}>
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