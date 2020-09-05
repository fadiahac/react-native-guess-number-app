import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import GameStartScreen from './screens/GameStartScreen';
import GameScreen from './screens/GameScreen';
import GameEndScreen from './screens/GameEndScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
};

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRound, setGuessRound] = useState(0);
    const [appLoaded, setAppLoaded] = useState(false);

    if (!appLoaded) {
        return (<AppLoading
            startAsync={fetchFonts}
            onFinish={() => { setAppLoaded(true) }}
            onError={(error) => console.log(error)}
        />);
    }

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
    }

    const gameOverHandler = (numberOfGuess) => {
        setGuessRound(numberOfGuess);
    }

    const gameRestartHandler = () => {
        setGuessRound(0);
        setUserNumber(null);
    }

    let screenContent = <GameStartScreen onStartGame={startGameHandler} />;
    if (userNumber && guessRound <= 0) {
        screenContent = <GameScreen userSelectedNumber={userNumber} onGameOver={gameOverHandler} />;
    } else if (guessRound > 0) {
        screenContent = <GameEndScreen guessRound={guessRound}
            userSelectedNumber={userNumber} onRestart={gameRestartHandler} />
    }

    return (
        <View style={styles.screen}>
            <Header title="Guess a Number" />
            {screenContent}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
