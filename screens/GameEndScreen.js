import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Color from '../constants/Colors';
import MainButton from '../components/MainButton'

const GameEndScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>Game Over !!</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/success.png')}
                        //source={{'uri' :'https://live.staticflickr.com/4101/4894850703_2d8bf2c978_b.jpg'}}
                        style={styles.image}
                        resizeMode='cover' />

                </View>
                <View>
                    <BodyText style={styles.resultContainer}> Computer guessed in <Text style={styles.highlight}>{props.guessRound} </Text>
            rounds your selected number <Text style={styles.highlight}> {props.userSelectedNumber}.</Text>
                    </BodyText>
                </View>
                <MainButton onPress={props.onRestart} >restart game</MainButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 2,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height > 400 ? 20 : 5,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: Dimensions.get('window').height > 600 ? 20 : 5,
        fontSize: Dimensions.get('window').height > 600 ? 18 : 14
    },
    highlight: {
        color: Color.primary,
        fontWeight: 'bold'
    }
});

export default GameEndScreen;