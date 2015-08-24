'use strict';

var DeckButton = require('../components/DeckButton');
var MasteredProgress = require('../components/MasteredProgress');
var StudyView = require('./StudyView');
var React = require('react-native');
var {
    ListView,
    StyleSheet,
    Text,
    View
} = React;

var SQLite = require('react-native-sqlite');

var database = SQLite.open("pharmcardsdb.sqlite");

var DeckList =  React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            loaded: false
        };
    },

    componentDidMount: function() {
        this.fetchDecks();
    },

    fetchDecks: function() {
        var decks = []
        database.executeSQL(
            "SELECT * FROM deck ORDER BY name ASC",
            [],
            (row) => {
                console.log("row: " + row);
                decks.push(row);
            },
            (error) => {
                if (error) {
                    throw error;
                } else {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(decks),
                        loaded: true,
                    });
                }
            }
        )
    },

    openDeck: function(deck) {
        console.log('open sesame')
        this.props.navigator.push({
            title: 'Study',
            component: StudyView,
            passProps: { deck }
        });
    },

    renderDeck: function(deck) {
        console.log('nav ' + this.props.navigator)
        return(
            <DeckButton
                deck={deck}
                navigator = {this.props.navigator}
            />
        )
    },

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <MasteredProgress format='circle' progress={0.67}/>
                    <Text style={styles.masteredText}>Mastered</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderDeck}
                    contentContainerStyle={styles.list}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    list: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#673AB7'
    },

    container: {
        flex: 1,
        marginTop: 65,
    },

    progressBar: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },

    masteredText: {
        color: '#607D8B',
        fontSize: 30,
        marginTop: 10,
        fontFamily: 'Avenir Next'
    },
});

module.exports = DeckList;
