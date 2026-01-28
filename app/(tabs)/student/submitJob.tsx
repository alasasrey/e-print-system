import { DropdownItem, RenderDropdown } from "@/components/dropdown";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/studentStyles";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Shop {
    id: number;
    print_shop_id: number;
    name: string;
    address: string;
    is_active: boolean;
}

// REMEMBER: THIS IS JUST A TEST OR PLACEHOLDER FOR DISPLAY ONLY USE THE DATABASE AND DELETE THIS CODE
const paperData: DropdownItem[] = [
    { label: "A4", value: "A4" },
    { label: "Letter", value: "Letter" },
    { label: "Legal", value: "Legal" },
];

// REMEMBER: THIS IS JUST A TEST OR PLACEHOLDER FOR DISPLAY ONLY USE THE DATABASE AND DELETE THIS CODE
const colorData: DropdownItem[] = [
    { label: "Black & White", value: "bw" },
    { label: "Color", value: "color" },
];

//PLEASE FINISH THIS CODE!!!

export default function SubmitJobScreen() {
    const [visible, setVisible] = useState(false);
    const [selectedPrintShop, setSelectedPrintShop] = useState<Shop | null>(null);

    const [file, setFile] = useState<any>(null);
    const [pages, setPages] = useState("1");
    const [copies, setCopies] = useState("1");
    const [notes, setNotes] = useState("");

    const [paperSize, setPaperSize] = useState("A4");
    const [colorMode, setColorMode] = useState("bw");
    const [orientation, setOrientation] = useState("portrait");
    const [binding, setBinding] = useState("none");

    const [printShops, setPrintShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch Print Shops from Supabase
    useEffect(() => {
        const getPrintShops = async () => {
            try {
                const { data, error } = await supabase
                    .from('print_shops')
                    .select('*')
                    .eq('is_active', true); // Only show active shops

                if (error) throw error;
                setPrintShops(data || []);
            } catch (error) {
                console.error("Error fetching shops:", error);
                setPrintShops([]);
            } finally {
                setLoading(false);
            }
        };

        getPrintShops();
    }, []);

    const handleSelectPrintShop = (shop: Shop) => {
        setSelectedPrintShop(shop);
        setVisible(false);
    };

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ["application/pdf", "image/*", "application/msword"],
        });

        if (!result.canceled) {
            setFile(result.assets[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file || !selectedPrintShop) {
            Alert.alert("Error", "Missing file or print shop");
            return;
        }

        try {
            // 1. Get current Auth User
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            // 2. Upload file to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}/${Date.now()}.${fileExt}`;
            const filePath = `print_jobs/${fileName}`;

            let fileBody;
            if (Platform.OS === 'web') {
                const response = await fetch(file.uri);
                fileBody = await response.blob();
            } else {
                // For mobile, you might need to convert to base64 or use a FileSystem helper
                const response = await fetch(file.uri);
                fileBody = await response.blob();
            }

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('documents') // Ensure you created a 'documents' bucket in Supabase
                .upload(filePath, fileBody);

            if (uploadError) throw uploadError;

            // 3. Get Public URL for the file
            const { data: { publicUrl } } = supabase.storage
                .from('documents')
                .getPublicUrl(filePath);

            // 4. Insert Job Record into 'print_jobs'
            const { error: insertError } = await supabase
                .from('print_jobs')
                .insert([{
                    user_id: user.id,
                    print_shop_id: selectedPrintShop.id,
                    file_name: file.name,
                    file_url: publicUrl,
                    file_type: file.mimeType || fileExt,
                    pages: parseInt(pages),
                    copies: parseInt(copies),
                    paper_size: paperSize,
                    color_mode: colorMode,
                    orientation: orientation,
                    binding: binding,
                    notes: notes,
                    status: 'pending',
                    payment_stat: 'unpaid'
                }]);

            if (insertError) throw insertError;

            Alert.alert("Success", "Job submitted successfully!");
            router.push("/(tabs)/student/orders");
        } catch (error: any) {
            console.error("Submission Error:", error.message);
            Alert.alert("Error", error.message || "Failed to submit job");
        }
    };

    const handleNumberChange = (text: string, setter: (val: string) => void) => {
        const cleaned = text.replace(/[^0-9]/g, "");
        setter(cleaned);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#FAFAFB" }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.homePadding}>
                    <Text style={styles.welcomeText}>Submit Print Job</Text>
                    <Text style={styles.subWelcome}>
                        Upload your document and configure print settings
                    </Text>

                    {/* TODO: FINISH THIS CODE IN THE DISPLAY PRINTSHOP DROPDOWN SELECTION */}

                    {/* Section 1: Select Print Shop */}
                    <Text style={styles.fieldLabel}>Select Print Shop</Text>
                    <Text style={styles.subLabel}>Choose where you want to print</Text>

                    {/* THE TRIGGER */}
                    <TouchableOpacity
                        style={styles.dropdownInput}
                        onPress={() => setVisible(!visible)}
                    >
                        <Text style={{ color: selectedPrintShop ? "#000" : "#888" }}>
                            {selectedPrintShop
                                ? selectedPrintShop.name
                                : "Select a print shop"}
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
                            <View
                                style={[
                                    styles.optionsContainer,
                                    Platform.OS === "web"
                                        ? styles.webOptions
                                        : styles.mobileOptions,
                                ]}
                            >
                                {/* TODO: FIX THIS DATA PROPERTY PRINTSHOPS ERROR ASK IN GOOGLE OR AI */}
                                <FlatList
                                    data={printShops}
                                    keyExtractor={(item) => item.id.toString()}
                                    // if the printshop table is empty
                                    ListEmptyComponent={
                                        <Text style={{ textAlign: "center", padding: 20 }}>
                                            No shops found
                                        </Text>
                                    }
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.optionItem}
                                            onPress={() => handleSelectPrintShop(item)}
                                        >
                                            <Text
                                                style={[
                                                    styles.optionText,
                                                    selectedPrintShop?.id === item.id &&
                                                    styles.selectedText,
                                                ]}
                                            >
                                                {item.name}
                                            </Text>
                                            {selectedPrintShop?.id === item.id && (
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
                        <Text style={styles.subLabel}>
                            PDF, DOC, DOCX, PPT, or images (max 50MB)
                        </Text>
                        <TouchableOpacity onPress={pickDocument} style={styles.uploadBox}>
                            <Ionicons name="cloud-upload-outline" size={20} color="#333" />
                            <Text style={styles.uploadText}>
                                {file ? file.name : "Choose File"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Section 3: Print Specifications */}
                    {/* number inputs */}
                    <View style={styles.formCard}>
                        <Text style={styles.fieldLabel}>Print Specifications</Text>
                        <Text style={styles.subLabel}>
                            Configure your printing preferences
                        </Text>

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
                                {RenderDropdown("Paper Size", paperSize, paperData, (item) =>
                                    setPaperSize(item.value),
                                )}
                                {RenderDropdown("Color Mode", colorMode, colorData, (item) =>
                                    setColorMode(item.value),
                                )}
                            </View>

                            <View style={styles.rowGap}>
                                {RenderDropdown(
                                    "Orientation",
                                    orientation,
                                    [
                                        { label: "Portrait", value: "portrait" },
                                        { label: "Landscape", value: "landscape" },
                                    ],
                                    (item) => setOrientation(item.value),
                                )}

                                {RenderDropdown(
                                    "Binding",
                                    binding,
                                    [
                                        { label: "None", value: "none" },
                                        { label: "Spiral", value: "spiral" },
                                        { label: "Hardcover", value: "hardcover" },
                                    ],
                                    (item) => setBinding(item.value),
                                )}
                            </View>
                        </View>

                        <Text style={styles.smallLabel}>Additional Notes (Optional)</Text>
                        <TextInput
                            value={notes}
                            onChangeText={setNotes}
                            style={[styles.input, { height: 60, textAlignVertical: "top" }]}
                            placeholder="Any special instructions..."
                            multiline
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={[styles.primaryButton, { marginBottom: 40 }]}
                    >
                        <Text style={styles.primaryButtonText}>Submit Document</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* FIXED BOTTOM NAVIGATION */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/(tabs)/student/home")}
                >
                    <Ionicons name="home-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItemActive}>
                    <Ionicons name="cloud-upload" size={22} color="white" />
                    <Text style={styles.navTextActive}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/(tabs)/student/orders")}
                >
                    <Ionicons name="list-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push("/(tabs)/student/profile")}
                >
                    <Ionicons name="person-outline" size={22} color="#888" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
