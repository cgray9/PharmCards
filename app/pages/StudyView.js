'use strict';

var CardView = require('../components/CardView');
var CircleButton = require('../components/CircleButton');
var MasteredProgress = require('../components/MasteredProgress');
var React = require('react-native');
var {
    ActivityIndicatorIOS,
    Animated,
    StyleSheet,
    Text,
    View
} = React;
var SQLite = require('react-native-sqlite');
var Dimensions = require('Dimensions');
var database = SQLite.open("pharmcardsdb.sqlite");

var screenWidth = Dimensions.get('window').width;

var StudyView = React.createClass({
    getInitialState: function() {
        return {
            cards: [],
            currentPos: 0,
            loaded: false,
            activeCard: null,
            checkModalY: new Animated.Value(0),
            checkModalOpacity: new Animated.Value(0)
        }
    },

    componentDidMount: function() {
        this.fetchCards();
    },

    fetchCards: function() {
        var cards = []
        database.executeSQL(
            "SELECT * FROM card where deck_id = ? AND mastered = 0 ORDER BY title ASC",
            [this.props.deck.id],
            (row) => {
                console.log("row: " + row);
                cards.push(row);
            },
            (error) => {
                if (error) {
                    throw error;
                } else {
                    this.setState({
                        cards: cards,
                        loaded: true,
                        activeCard: cards[0]
                    });
                }
            }
        )
    },

    nextCard: function() {
        this.changeCardPos(1);
    },

    prevCard: function() {
        this.changeCardPos(-1);
    },

    checkCard: function() {
        Animated.sequence([
            Animated.parallel([
                Animated.spring(this.state.checkModalY, {
                    toValue: 65,
                    tension: 40,
                    friction: 3
                }),
                Animated.timing(this.state.checkModalOpacity, {
                    toValue: 1,
                    duration: 250
                })
            ]),

            Animated.timing(this.state.checkModalOpacity, {
                toValue: 0,
                duration: 500
            })
        ]).start(this.resetCheck())

    },

    resetCheck: function() {
        this.state.checkModalY.setValue(0);
    },

    changeCardPos: function(posDelta) {
        var pos = this.state.currentPos + posDelta
        var newPos = (pos < 0 ? this.state.cards.length - 1 : pos ) % this.state.cards.length;
        this.setState({
            currentPos: newPos,
            activeCard: this.state.cards[newPos]
        });
    },

    renderLoading: function() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicatorIOS color={'#712FA9'} style={styles.spinner} size="large" />
            </View>
        );
    },

    renderMastered: function() {
        return(
            <View style={styles.container}>
                <Text>You the Master yo!</Text>
            </View>
        )
    },

    renderStudy: function() {
        return(
            <View style={styles.container}>
                <View style={styles.stretchContainer}>
                    <View style={styles.progressBar}>
                        <MasteredProgress progress={0.67} format='line'/>
                    </View>
                    <View style={styles.card}>
                        <CardView card={this.state.activeCard} nextCard={this.nextCard} prevCard={this.prevCard} checkCard={this.checkCard}/>
                    </View>
                </View>
                <View style={styles.centerContainer}>
                    <Animated.View style={[styles.checkModal, {
                            opacity: this.state.checkModalOpacity,
                            transform: [
                                {translateY: this.state.checkModalY}
                            ]
                        }]}>
                        <Text style={styles.checkModalText}>
                            You da man!
                        </Text>
                    </Animated.View>
                </View>
            </View>
        );
    },

    render: function() {
        if (this.state.loaded) {
            if (this.state.cards.length) {
                return this.renderStudy();
            } else {
                return this.renderMastered();
            }
        } else {
            return this.renderLoading();
        }
    }
});

var styles = StyleSheet.create({
    stretchContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 22,
        marginRight: 22
    },

    container: {
        flex: 1,
        marginTop: 65,
        justifyContent: 'center'
    },

    centerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },

    checkModal: {
        marginHorizontal: (screenWidth - 200) / 2,
        //marginTop: 20,
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#00EAB5',
    },

    checkModalText: {
        color: '#FFFFFF',
        fontSize: 21,
        fontFamily: 'Avenir Next'
    },

    progressBar: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        flex: 0.9,
        marginBottom: 20
    },

    buttonGroup: {
        flex: 0.01,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50,
        marginLeft: 20,
        marginRight: 20
    },

    loadingContainer: {
        flex: 1,
        paddingBottom: 80,
        alignItems: 'center'
    },

    spinner: {
        flex: 1,
    },
})

module.exports = StudyView;
