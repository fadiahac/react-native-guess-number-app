import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import InputContainer from '../components/InputContainer';
import Card from '../components/Card';
import FontStylesheets from '../constants/Default-stylesheet';
import MainButton from '../components/MainButton'
import { Ionicons } from '@expo/vector-icons'
import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {
        return generateRandomNumber(min, max, exclude);
    }
    return randomNumber;
}

const renderGuessList = (item, roundNumber) => {
    return (
        <View /* key={roundNumber} */ style={styles.listItem}>
            <Text>#{roundNumber}</Text>
            <Text>{item}</Text>
        </View>
    );
}

const GameScreen = props => {
    // Lock screen orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const [currentGuess, setCurrentGuess] = useState(
        generateRandomNumber(1, 100, props.userSelectedNumber)
    );
    const [oldGuesses, setOldGuesses] = useState([]);
    //const [guessRound, setGuessRound] = useState(0);

    const minNumber = useRef(1);
    const maxNumber = useRef(100);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userSelectedNumber) || (direction === 'greater' && currentGuess > props.userSelectedNumber)) {
            Alert.alert('Don\'t lie!', 'You are telling wrong to me!!', [{ 'text': 'Sorry!', 'style': 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            maxNumber.current = currentGuess;
        } else {
            minNumber.current = currentGuess;
        }
        setCurrentGuess(generateRandomNumber(minNumber.current, maxNumber.current, currentGuess));
        //setGuessRound(guessRound + 1);
        setOldGuesses([currentGuess, ...oldGuesses]);
    }

    const { userSelectedNumber, onGameOver } = props;
    useEffect(() => {
        if (currentGuess === userSelectedNumber) {
            onGameOver(oldGuesses.length)
        }
    }, [currentGuess, userSelectedNumber, onGameOver]);

    if (Dimensions.get('window').height < 500) {
        return (
            <View style={styles.screen}>
                <Text style={FontStylesheets.bodyTitle}>Opponent Guess</Text>
                <View style={styles.landscapeButtonContainer}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name="ios-arrow-down"> </Ionicons>
                     lower
                    </MainButton>
                    <InputContainer>{currentGuess}</InputContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                        <Ionicons name="ios-arrow-up"> </Ionicons>greater</MainButton>
                </View>
                <View style={styles.listContainer}>

                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {
                        oldGuesses.map((guessNumber, index) => {
                            return renderGuessList(guessNumber, oldGuesses.length - index)
                        })
                    }
                </ScrollView> */}
                    <FlatList contentContainerStyle={styles.list}
                        keyExtractor={item => item.toString()}
                        data={oldGuesses}
                        renderItem={(data) => renderGuessList(data.item, oldGuesses.length - data.index)}
                    />

                    <Text>Computer's Previously Guess Numbers</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={FontStylesheets.bodyTitle}>Opponent Guess</Text>
            <InputContainer>{currentGuess}</InputContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="ios-arrow-down"> </Ionicons>
                     lower
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="ios-arrow-up"> </Ionicons>greater</MainButton>
            </Card>
            <View style={styles.listContainer}>

                {/* <ScrollView contentContainerStyle={styles.list}>
                    {
                        oldGuesses.map((guessNumber, index) => {
                            return renderGuessList(guessNumber, oldGuesses.length - index)
                        })
                    }
                </ScrollView> */}
                <FlatList contentContainerStyle={styles.list}
                    keyExtractor={item => item.toString()}
                    data={oldGuesses}
                    renderItem={(data) => renderGuessList(data.item, oldGuesses.length - data.index)}
                />

                <Text>Computer's Previously Guess Numbers</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    landscapeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    buttonContainer: {
        width: 300,
        maxWidth: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: Dimensions.get('window').height > 600 ? 20 : 5
    },
    listContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        //borderWidth:1,
        //borderColor: 'red',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        width: '60%',
        alignItems: 'center',
        //borderColor: 'blue',
        //borderWidth: 1,
    },
    listItem: {
        flexDirection: 'row',
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 10,
    }

});

export default GameScreen;