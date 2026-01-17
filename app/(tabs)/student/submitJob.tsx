

// import { Ionicons } from '@expo/vector-icons';
// import * as DocumentPicker from 'expo-document-picker';
// import { router } from "expo-router";
// import React, { useState } from "react";
// import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { styles } from "../../../styles/studentStyles";




// export default function SubmitJobScreen() {
//     // --- State Variables ---
//     const [printShop, setPrintShop] = useState("");
//     const [file, setFile] = useState<any>(null);
//     const [pages, setPages] = useState("1");
//     const [copies, setCopies] = useState("1");


//     // The specific ones you requested:
//     const [paperSize, setPaperSize] = useState("A4");
//     const [colorMode, setColorMode] = useState("Black & White");
//     const [orientation, setOrientation] = useState("Portrait");
//     const [binding, setBinding] = useState("None");
//     const [notes, setNotes] = useState("");


//     // Helper function to create a simple selection menu
//     const selectOption = (title: string, options: string[], setter: (val: string) => void) => {
//         Alert.alert(
//             title,
//             `Select an option:`,
//             options.map(opt => ({
//                 text: opt,
//                 onPress: () => setter(opt)
//             })),
//             { cancelable: true }
//         );
//     };


//     const pickDocument = async () => {
//         let result = await DocumentPicker.getDocumentAsync({
//             type: ["application/pdf", "image/*", "application/msword"],
//         });
//         if (!result.canceled) setFile(result.assets[0]);
//     };


//     return (
//         <View style={{ flex: 1, backgroundColor: '#FAFAFB' }}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.homePadding}>
//                     <Text style={styles.welcomeText}>Submit Print Job</Text>


//                     {/* Section 1: Select Print Shop */}
//                     <View style={styles.formCard}>
//                         <Text style={styles.fieldLabel}>Select Print Shop</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="e.g. Library, Comp Lab"
//                             value={printShop}
//                             onChangeText={setPrintShop}
//                         />
//                     </View>


//                     {/* Section 2: Upload */}
//                     <View style={styles.formCard}>
//                         <Text style={styles.fieldLabel}>Upload Document</Text>
//                         <Text style={styles.subLabel}>PDF, DOC, DOCX, PPT, or images (max 50MB)</Text>
//                         <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
//                             <Ionicons name="cloud-upload-outline" size={20} color="#333" />
//                             <Text style={styles.uploadText}>{file ? file.name : "Choose File"}</Text>
//                         </TouchableOpacity>
//                     </View>


//                     {/* Section 3: Specifications */}
//                     <View style={styles.formCard}>
//                         <Text style={styles.fieldLabel}>Print Specifications</Text>


//                         {/* Pages & Copies Row */}
//                         <View style={styles.rowGap}>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Number of Pages</Text>
//                                 <TextInput style={styles.input} value={pages} onChangeText={setPages} keyboardType="numeric" />
//                             </View>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Copies</Text>
//                                 <TextInput style={styles.input} value={copies} onChangeText={setCopies} keyboardType="numeric" />
//                             </View>
//                         </View>


//                         {/* Paper Size & Color Mode Row */}
//                         <View style={styles.rowGap}>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Paper Size</Text>
//                                 <TouchableOpacity
//                                     style={styles.dropdownInput}
//                                     onPress={() => selectOption("Paper Size", ["A4", "Letter", "Legal"], setPaperSize)}
//                                 >
//                                     <Text>{paperSize}</Text>
//                                     <Ionicons name="chevron-down" size={16} color="#888" />
//                                 </TouchableOpacity>
//                             </View>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Color Mode</Text>
//                                 <TouchableOpacity
//                                     style={styles.dropdownInput}
//                                     onPress={() => selectOption("Color Mode", ["Black & White", "Colored"], setColorMode)}
//                                 >
//                                     <Text>{colorMode}</Text>
//                                     <Ionicons name="chevron-down" size={16} color="#888" />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>


//                         {/* Orientation & Binding Row */}
//                         <View style={styles.rowGap}>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Orientation</Text>
//                                 <TouchableOpacity
//                                     style={styles.dropdownInput}
//                                     onPress={() => selectOption("Orientation", ["Portrait", "Landscape"], setOrientation)}
//                                 >
//                                     <Text>{orientation}</Text>
//                                     <Ionicons name="chevron-down" size={16} color="#888" />
//                                 </TouchableOpacity>
//                             </View>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={styles.smallLabel}>Binding</Text>
//                                 <TouchableOpacity
//                                     style={styles.dropdownInput}
//                                     onPress={() => selectOption("Binding", ["None", "Stapled", "Ring Bound"], setBinding)}
//                                 >
//                                     <Text>{binding}</Text>
//                                     <Ionicons name="chevron-down" size={16} color="#888" />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>


//                         <Text style={styles.smallLabel}>Notes</Text>
//                         <TextInput
//                             style={[styles.input, { height: 60 }]}
//                             multiline
//                             value={notes}
//                             onChangeText={setNotes}
//                             placeholder="Special instructions..."
//                         />
//                     </View>


//                     <TouchableOpacity style={styles.primaryButton}>
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





import axiosInstance from '@/utils/axiosInstance';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, Modal, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from "../../../styles/studentStyles";

interface Shop {
    id: string;
    name: string;
}

const SHOPS: Shop[] = [
    { id: '1', name: 'QuickPrint Express' },
    { id: '2', name: 'Campus Copy Center' },
    { id: '3', name: 'Student Print Hub' },
];

// Define the type for our dropdown items
interface DropdownItem {
    label: string;
    value: string;
}

const paperData: DropdownItem[] = [
    { label: 'A4', value: 'A4' },
    { label: 'Letter', value: 'Letter' },
    { label: 'Legal', value: 'Legal' },
];

const colorData: DropdownItem[] = [
    { label: 'Black & White', value: 'bw' },
    { label: 'Color', value: 'color' },
];

export default function SubmitJobScreen() {
    const [visible, setVisible] = useState(false);
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    // const [printShop, setPrintShop] = useState("Main Campus Library");

    const [file, setFile] = useState<any>(null);
    const [pages, setPages] = useState("1");
    const [copies, setCopies] = useState("1");
    const [notes, setNotes] = useState("");


    const [paperSize, setPaperSize] = useState('A4');
    const [colorMode, setColorMode] = useState('bw');
    const [orientation, setOrientation] = useState('portrait');
    const [binding, setBinding] = useState('none');

    const handleSelectPrintShop = (shop: Shop) => {
        setSelectedShop(shop);
        setVisible(false);
    };


    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: ["application/pdf", "image/*", "application/msword"],
        });

        if (!result.canceled) {
            setFile(result.assets[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            Alert.alert("Error", "Please upload a document first");
            return;
        }
        if (!selectedShop) {
            Alert.alert("Error", "Please select a print shop");
            return;
        }

        try {
            const userId = await AsyncStorage.getItem("userId");
            const formData = new FormData();

            // 1. File Append (Must match 'file' in upload.single('file'))
            formData.append('file', {
                uri: file.uri,
                name: file.name,
                type: file.mimeType || 'application/pdf',
            } as any);

            // 2. Data Append (NAMES MUST MATCH BACKEND DESTRUCTURING)
            formData.append('userId', userId || "1");
            formData.append('printShopId', selectedShop.id); // CHANGED from 'printShop' to 'printShopId'
            formData.append('pages', pages);
            formData.append('copies', copies);
            formData.append('notes', notes);
            formData.append('paperSize', paperSize);
            formData.append('colorMode', colorMode);
            formData.append('orientation', orientation);
            formData.append('binding', binding);

            const response = await axiosInstance.post(`/submit-job`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            Alert.alert("Success", "Job submitted successfully!");
            router.push("/(tabs)/student/orders");
        } catch (error: any) {
            // Detailed logging to help you see WHY it failed
            console.error("Submission Error Details:", error.response?.data || error.message);
            Alert.alert("Error", error.response?.data?.message || "Failed to submit job");
        }
    };

    // Helper to ensure only digits are entered
    const handleNumberChange = (text: string, setter: (val: string) => void) => {
        // Remove anything that isn't a digit
        const cleaned = text.replace(/[^0-9]/g, '');
        setter(cleaned);
    };


    // Reusable Dropdown Component to keep code clean
    const RenderDropdown = (label: string, value: string, data: DropdownItem[], onChange: (item: DropdownItem) => void) => (
        <View style={{ flex: 1 }}>
            <Text style={styles.smallLabel}>{label}</Text>
            <Dropdown
                style={styles.dropdownInput}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                labelField="label"
                valueField="value"
                value={value}
                onChange={onChange}
                renderRightIcon={() => (
                    <Ionicons name="chevron-down" size={16} color="#888" />
                )}
            />
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFB' }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.homePadding}>
                    <Text style={styles.welcomeText}>Submit Print Job</Text>
                    <Text style={styles.subWelcome}>Upload your document and configure print settings</Text>

                    {/* Section 1: Select Print Shop */}
                    <Text style={styles.fieldLabel}>Select Print Shop</Text>
                    <Text style={styles.subLabel}>Choose where you want to print</Text>

                    {/* THE TRIGGER */}
                    <TouchableOpacity
                        style={styles.dropdownInput}
                        onPress={() => setVisible(!visible)}
                    >
                        <Text style={{ color: selectedShop ? '#000' : '#888' }}>
                            {selectedShop ? selectedShop.name : 'Select a print shop'}
                        </Text>
                        <Ionicons
                            name={visible ? "chevron-up" : "chevron-down"}
                            size={18}
                            color="#888"
                        />
                    </TouchableOpacity>

                    {/* RESPONSIVE SELECTION UI */}
                    <Modal
                        transparent={true}
                        visible={visible}
                        animationType="fade"
                        onRequestClose={() => setVisible(false)}
                    >
                        <Pressable
                            style={styles.modalOverlay}
                            onPress={() => setVisible(false)}
                        >
                            <View style={[
                                styles.optionsContainer,
                                Platform.OS === 'web' ? styles.webOptions : styles.mobileOptions
                            ]}>
                                <FlatList
                                    data={SHOPS}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.optionItem}
                                            onPress={() => handleSelectPrintShop(item)}
                                        >
                                            <Text style={[
                                                styles.optionText,
                                                selectedShop?.id === item.id && styles.selectedText
                                            ]}>
                                                {item.name}
                                            </Text>
                                            {selectedShop?.id === item.id && (
                                                <Ionicons name="checkmark" size={18} color="#0A0A1B" />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </Pressable>
                    </Modal>

                    {/* Section 2: Upload Document */}
                    <View style={styles.formCard}>
                        <Text style={styles.fieldLabel}>Upload Document</Text>
                        <Text style={styles.subLabel}>PDF, DOC, DOCX, PPT, or images (max 50MB)</Text>
                        <TouchableOpacity onPress={pickDocument} style={styles.uploadBox}>
                            <Ionicons name="cloud-upload-outline" size={20} color="#333" />
                            <Text style={styles.uploadText}>{file ? file.name : "Choose File"}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Section 3: Print Specifications */}
                    {/* number inputs */}
                    <View style={styles.formCard}>
                        <Text style={styles.fieldLabel}>Print Specifications</Text>
                        <Text style={styles.subLabel}>Configure your printing preferences</Text>

                        <View style={styles.rowGap}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Number of Pages</Text>
                                <TextInput
                                    value={pages}
                                    onChangeText={(text) => handleNumberChange(text, setPages)}
                                    style={styles.input}
                                    placeholder="1"
                                    keyboardType="number-pad" // Better for integers than "numeric"
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.smallLabel}>Copies</Text>
                                <TextInput
                                    value={copies}
                                    onChangeText={(text) => handleNumberChange(text, setCopies)}
                                    style={styles.input}
                                    placeholder="1"
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>

                        {/* dropdown selection inputs */}
                        <View style={styles.container}>
                            <View style={styles.rowGap}>
                                {RenderDropdown('Paper Size', paperSize, paperData, (item) => setPaperSize(item.value))}
                                {RenderDropdown('Color Mode', colorMode, colorData, (item) => setColorMode(item.value))}
                            </View>

                            <View style={styles.rowGap}>
                                {RenderDropdown('Orientation', orientation, [
                                    { label: 'Portrait', value: 'portrait' },
                                    { label: 'Landscape', value: 'landscape' }
                                ], (item) => setOrientation(item.value))}

                                {RenderDropdown('Binding', binding, [
                                    { label: 'None', value: 'none' },
                                    { label: 'Spiral', value: 'spiral' },
                                    { label: 'Hardcover', value: 'hardcover' }
                                ], (item) => setBinding(item.value))}
                            </View>
                        </View>

                        <Text style={styles.smallLabel}>Additional Notes (Optional)</Text>
                        <TextInput
                            value={notes}
                            onChangeText={setNotes}
                            style={[styles.input, { height: 60, textAlignVertical: 'top' }]}
                            placeholder="Any special instructions..."
                            multiline
                        />
                    </View>

                    <TouchableOpacity onPress={handleSubmit} style={[styles.primaryButton, { marginBottom: 40 }]}>
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