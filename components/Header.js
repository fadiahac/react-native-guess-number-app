import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/Colors';
import FontStylesheets from '../constants/Default-stylesheet';

const Header = props => {
    return (
        <View style={
            {
                ...styles.headerBase,
                ...Platform.select(
                    {
                        ios: styles.headerIos,
                        android: styles.headerAndroid
                    }
                )
            }}>
            <Text style={{ ...FontStylesheets.headerText, ...styles.headerTitle }}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 35,
        alignItems: 'center',
        justifyContent: 'center',

    },
    headerIos: {
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
    },
    headerTitle: {
        color: Platform.OS === 'android' ? 'white' : Colors.primary,
        fontSize: 23
    }
});

export default Header;