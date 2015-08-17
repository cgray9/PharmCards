'use strict';

var CircleProgress = require('react-native-circle-progress')
var ProgressBar = require('./ProgressBar')
var Dimensions = require('Dimensions');

var React = require('react-native');
var {
    ListView,
    StyleSheet,
    Text,
    View
} = React;

var screenWidth = Dimensions.get('window').width;

var MasteredProgress = React.createClass({
    getInitialState() {
        return {
            progress: 0
        }
    },

    componentDidMount: function() {
        this.setState({
            progress: this.props.progress
        })
    },

    render() {
        if (this.props.format == 'circle') {
            return(
                        <CircleProgress
                            progress={this.state.progress}
                            lineWidth={3}
                            circleRadius={75}
                            circleColor='#1DE9B6'
                            style={styles.progressCircle}>
                            <View style={styles.circle}>
                                <Text style={styles.circleText}>{this.state.progress*100}%</Text>
                            </View>
                        </CircleProgress>
            )
        } else if (this.props.format == 'line') {
            return(
                <ProgressBar
                    fillStyle={{backgroundColor: '#1DE9B6'}}
                    backgroundStyle={{backgroundColor: '#A7A3A3'}}
                    style={{width: screenWidth - 44}}
                    progress={this.state.progress} />
            )
        }
    }
});

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },

    circleText: {
        color: '#1DE9B6',
        fontSize: 30,
        fontFamily: 'Avenir Next'
    },

    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#607D8B',
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4
    },
    circleBorder: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 6,
        borderColor: '#B0BEC5',
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressCircle: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

module.exports = MasteredProgress
