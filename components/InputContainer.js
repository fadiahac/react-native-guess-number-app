import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../constants/Colors'

const InputContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //padding: 20,
        borderColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        borderColor: Colors.secondary,
        borderWidth: 2,
        padding: 10,
        marginVertical: 10,
        textAlign: 'center',
        color: Colors.secondary,
        borderRadius: 10,
        fontSize: 20
    }
});

export default InputContainer;