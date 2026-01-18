import { styles } from "@/styles/studentStyles";
import { Ionicons } from "@expo/vector-icons";
import { default as React } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

// Define the type for our dropdown items
interface DropdownItem {
    label: string;
    value: string;
}

// Reusable Dropdown Component to keep code clean
const RenderDropdown = (
    label: string,
    value: string,
    data: DropdownItem[],
    onChange: (item: DropdownItem) => void,
) => (
    <View style={{ flex: 1 }}>
        <Text style={styles.smallLabel}>{label}</Text>
        <TouchableOpacity>
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
        </TouchableOpacity>
    </View>
);

export { DropdownItem, RenderDropdown };

