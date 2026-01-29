import React from 'react';
import { View } from 'react-native';

export default function TimePicker({ value, onChange }: any) {
    return (
        <View style={{ marginVertical: 10 }}>
            <input
                type="time"
                style={{
                    height: 45,
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid #EEE',
                    width: '100%'
                }}
                onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':');
                    const d = new Date();
                    d.setHours(parseInt(hours), parseInt(minutes));
                    onChange({ type: 'set' }, d);
                }}
            />
        </View>
    );
}