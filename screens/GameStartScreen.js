import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import InputContainer from '../components/InputContainer'
import MainButton from '../components/MainButton'

const GameStartScreen = props => {
    const [enteredText, setEnteredText] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [confirmedNumber, setConfirmedNumber] = useState();
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);

    const inputNumberhandler = inputNumber => {
        setEnteredText(inputNumber.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredText('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {

        enteredNumber = parseInt(enteredText);
        if (isNaN(enteredNumber) || enteredNumber <= 0 || enteredNumber > 99) {
            Alert.alert('Invalid number', 'Please enter number between 1 to 99', [{ 'text': 'Okay', 'style': 'destructive', onPress: resetInputHandler }]);
            return;
        }

        setConfirmed(true);
        setEnteredText('');
        setConfirmedNumber(enteredNumber);
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (<Card style={styles.summaryContainer}>
            <Text>You Selected</Text>
            <InputContainer>{confirmedNumber}</InputContainer>
            <MainButton onPress={() => props.onStartGame(confirmedNumber)}>
                Start game
            </MainButton>
        </Card>);
    }

    useEffect(() => {
        const updateLayout = () => {
            setDeviceWidth(Dimensions.get('window').width);
        }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change',updateLayout);
        }
    })


    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
                <View style={styles.screen}>
                    <Text style={styles.title}>Start a New Game</Text>
                    <Card style={styles.inputContainer}>
                        <Text>Select a Number</Text>
                        <Input style={styles.input}
                            blurOnSubmit
                            keyboardType="number-pad"
                            maxLength={2}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={inputNumberhandler}
                            value={enteredText}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={{width: deviceWidth / 4}}>
                                <Button title="Reset" color={Colors.secondary} onPress={resetInputHandler} />
                            </View>
                            <View style={{width: deviceWidth / 4}}>
                                <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler} />
                            </View>
                        </View>
                    </Card>
                    {confirmedOutput}
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        alignItems: 'center',
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    // button: {
    //     width: Dimensions.get('window').width / 4,
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 10,
        alignItems: 'center'
    }
});

export default GameStartScreen;