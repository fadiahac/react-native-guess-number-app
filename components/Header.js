import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/Colors';
import FontStylesheets from '../constants/Default-stylesheet';

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={{...FontStylesheets.headerText,...styles.headerTitle}}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'grey',
        paddingTop: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'white',
        fontSize: 23
    }
});

export default Header;