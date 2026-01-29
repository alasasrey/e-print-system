import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';

export default function TimePicker({ value, onChange }: any) {
    return (
        <DateTimePicker
            value={value}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChange}
        />
    );
}