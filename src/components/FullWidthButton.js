import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import theme from '../theme/theme';

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

const FullWidthButton = ({ label, onPress }) => (
    <Pressable style={theme.button} onPress={onPress}>
        <Text style={theme.buttonText}>{label}</Text>
    </Pressable>
);

export default FullWidthButton;
