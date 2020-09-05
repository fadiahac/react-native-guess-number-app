import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../constants/Colors';

const MainButton = props => {
    let ButtonTouchEffect = TouchableOpacity;
    if (Platform.Version >= 21) {
        ButtonTouchEffect = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonContainer}>
            <ButtonTouchEffect onPress={props.onPress} activeOpacity={0.6}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonTouchEffect>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        textTransform: 'uppercase',
    },
});

export default MainButton;