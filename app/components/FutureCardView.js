'use strict';

var React = require('react-native');
var {
    Animated,
    StyleSheet,
    Text,
    View
} = React;

var CardView = React.createClass({
    getInitialState() {
        return {
            theta: new Animated.Value(45)
        };
    },

    componentDidMount() {
        this._animate();
    },

    _animate(){
        this.state.theta.setValue(0);
        Animated.timing(this.state.theta, {
            toValue: 360,
            duration: 5000
        }).start(this._animate);
    },

    render: function() {
        return(
            <View style={styles.cardContainer}>
                <Animated.View style={[styles.card,
                    {transform:[
                        {perspective: 850},
                        {rotateX: this.state.theta.interpolate({
                            inputRange: [0, 180],
                            outputRange: ['0deg', '180deg']
                        })}
                    ]}
                ]}>
                    <Text style={styles.titleText}>Acetaxolamide</Text>
                </Animated.View>
                <Animated.View style={[styles.card,
                    {position: 'absolute',
                    top: 0,
                    backgroundColor: 'red',
                    transform: [
                        {perspective: 850},
                        {rotateX: this.state.theta.interpolate({
                            inputRange: [0, 180],
                            outputRange: ['0deg', '180deg']
                        })}
                    ]}
                ]}>
                    <Text style={styles.titleText}>Flipping Awesome</Text>
                </Animated.View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CFD8DC',
        //backfaceVisibility: 'hidden',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        },
    },

    titleText: {
        color: '#4A4A4A',
        fontSize: 30,
        fontFamily: 'Avenir Next'
    }
})

module.exports = CardView;
