import React from 'react';
import { Pressable, Text } from 'react-native';
import theme from '../theme/theme';


const FullWidthButton = ({ label, onPress }) => (
    <Pressable style={theme.button} onPress={onPress}>
        <Text style={theme.buttonText}>{label}</Text>
    </Pressable>
);

export default FullWidthButton;
