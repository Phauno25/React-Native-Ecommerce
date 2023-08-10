import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import globalStyles from "../global/globalStyles";


const SubmitButton = ({ onPress, title }) => {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default SubmitButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: globalStyles.color.primary,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        width: '60%'
    },
    text: {
        color: globalStyles.color.textPrimary,
        fontSize: 22
    },
});