'use strict';

var DeckList = require('./app/pages/DeckList')
var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    StatusBarIOS,
} = React;

var PharmCardsProject = React.createClass({
    componentDidMount() {
        StatusBarIOS.setStyle(1)
    },

    render: function() {
        return (
                <NavigatorIOS
                    barTintColor='#673AB7'
                    titleTextColor='#FFFFFF'
                    tintColor='#FFFFFF'
                    style={styles.container}
                    initialRoute={{
                        component: DeckList,
                        title: 'bugs & drugs'
                    }}
                />
        );
    }
});

var styles = StyleSheet.create({
    text: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 30,
        margin: 80
    },
    container: {
        flex: 1,
        fontFamily: 'Avenir Next',
    }
});

AppRegistry.registerComponent('PharmCardsProject', () => PharmCardsProject);
