'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var StudyView = require('../pages/StudyView');

var screenWidth = Dimensions.get('window').width;
var buttonSize = (screenWidth / 2) - 35

var {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} = React;

var DeckButton =  React.createClass({
    selectDeck: function(deck) {
        console.log('open sesame');
        this.props.navigator.push({
            title: deck.name.toLowerCase(),
            component: StudyView,
            passProps: { deck }
        });
    },

    render() {
        var nav = this.props.navigator
        return(
            <TouchableHighlight style={styles.deck} underlayColor='#B0BEC5' onPress={ this.selectDeck.bind(this, this.props.deck) }>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        {this.props.deck.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    text: {
        color: '#607D8B',
        fontSize: 30,
        fontFamily: 'Avenir Next'
    },
    deck: {
        width: buttonSize,
        height: buttonSize,
        margin: 10,
        backgroundColor: '#CFD8DC',
        alignItems: 'center',
        alignSelf: 'auto',
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = DeckButton
