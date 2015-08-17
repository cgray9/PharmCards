'use strict';

var CardView = require('../components/CardView');
var CircleButton = require('../components/CircleButton');
var MasteredProgress = require('../components/MasteredProgress');
var React = require('react-native');
var {
    StyleSheet,
    Text,
    View
} = React;

var StudyView = React.createClass({
    render: function() {
        return(
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <MasteredProgress progress={0.67} format='line'/>
                </View>
                <View style={styles.card}>
                    <CardView/>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 65,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 22,
        marginRight: 22
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
    }
})

module.exports = StudyView;
