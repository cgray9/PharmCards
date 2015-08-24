'use strict';
var CircleButton = require('../components/CircleButton');
var React = require('react-native');
var {
    Animated,
    PanResponder,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} = React;

var CardView = React.createClass({
    getInitialState() {
        return {
            panX: new Animated.Value(0),
            theta: new Animated.Value(0),
            opacity: new Animated.Value(1),
            buttonsY: new Animated.Value(0),
            flipped: false,
            showMOA: false,
            showSE: false,
            showTX: false
        };
    },

    componentWillMount: function() {
        this._tiltPanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                console.log("grant")
                Animated.timing(this.state.opacity, {
                    toValue: this.state.panX.interpolate({
                        inputRange: [-300, 0, 300],
                        outputRange: [0, 1, 0],
                    }),
                    duration: 0
                }).start();
            },
            onPanResponderMove: Animated.event(
                [null, {dx: this.state.panX}]
            ),
            onPanResponderRelease: (e, gestureState) => {
                var toValue = 0;
                if (gestureState .dx > 100) {
                    toValue = 500;
                } else if (gestureState.dx < -100) {
                    toValue = -500;
                }

                Animated.spring(this.state.panX, {
                    toValue: toValue,
                    velocity: gestureState.vx,
                    tension: 10,
                    friction: 3
                }).start()
                this.state.panX.removeAllListeners();
                var id = this.state.panX.addListener(({value}) => {
                    console.log('value ' + value)
                    if (value > 400) {
                        this.next()
                    } else if (value < -400) {
                        this.prev()
                    }

                    if (Math.abs(value) > 400) {
                        this.state.panX.removeListener(id);
                        Animated.timing(this.state.opacity, {
                            toValue: 1
                        }).start();
                        this.state.panX.setValue(0);
                    }
                })
            }
        })
    },

    flip() {
        var flipToValue = this.state.flipped ? 0 : 180
        var buttonsToValue = this.state.flipped ? 0 : 30
        this.setState({ flipped: ! this.state.flipped })
        Animated.parallel([
            Animated.timing(this.state.buttonsY, {
                toValue: buttonsToValue,
                duration: 1000
            }),
            Animated.timing(this.state.theta, {
                toValue: flipToValue,
                duration: 1000
            })
        ]).start();
    },

    check() {
        this.props.checkCard();
        this.next();
    },

    reset() {
        if (this.state.flipped) {
            this.flip();
        }
        Animated.timing(this.state.opacity, {
            toValue: 1
        }).start();
        this.state.panX.setValue(0);
        this.setState({
            showMOA: false,
            showSE: false,
            showTX: false
        })
    },

    next() {
        Animated.parallel([
            Animated.timing(this.state.panX, {
                toValue: 500,
                duration: 500
            }),
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 500
            }),
        ]).start(function() {
            this.reset();
            this.props.nextCard();
        }.bind(this))
    },

    prev() {
        this.reset()
        this.props.prevCard();
    },

    toggleMOA() {
        this.setState({ showMOA: ! this.state.showMOA })
    },

    toggleSE() {
        this.setState({ showSE: ! this.state.showSE })
    },

    toggleTX() {
        this.setState({ showTX: ! this.state.showTX })
    },

    render: function() {
        console.log("opacity: " + this.state.opacity.getAnimatedValue())
                    console.log("panX: " + this.state.panX.getAnimatedValue())
        return(
            <View style={styles.cardContainer}>
                    <Animated.View {...this._tiltPanResponder.panHandlers} style={[styles.card,
                        {
                            opacity: this.state.opacity,
                            transform:[
                            {perspective: 850},
                            {rotateX: this.state.theta.interpolate({
                                inputRange: [0, 180],
                                outputRange: ['0deg', '180deg']
                            })},
                            {rotate: this.state.panX.interpolate({
                                inputRange: [-320, 320],
                                outputRange: ['-15deg', '15deg']
                            })},
                            {translateX: this.state.panX},
                        ]}
                    ]}>
                        <Text style={styles.titleText}>{this.props.card.title}</Text>
                    </Animated.View>
                    <Animated.View {...this._tiltPanResponder.panHandlers} style={[styles.card,
                        {position: 'absolute',
                        top: 0,
                        alignItems: 'stretch',
                        opacity: this.state.opacity,
                        transform: [
                            {perspective: 850},
                            {rotateX: this.state.theta.interpolate({
                                inputRange: [0, 180],
                                outputRange: ['180deg', '360deg']
                            })},
                            {rotate: this.state.panX.interpolate({
                                inputRange: [-320, 320],
                                outputRange: ['-15deg', '15deg']
                            })},
                            {translateX: this.state.panX},
                        ]}
                    ]}>
                        <TouchableOpacity style={[styles.termSection, {backgroundColor: '#512DA8'}]} activeOpacity={0.8} onPress={this.toggleMOA}>
                            <Text style={styles.termSectionText}>{this.state.showMOA ? this.props.card.mechanism_of_action : "Mechanism of Action"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.termSection, {backgroundColor: '#673AB7'}]} activeOpacity={0.8} onPress={this.toggleSE}>
                            <Text style={styles.termSectionText}>{this.state.showSE ? this.props.card.side_effects : "Side Effects"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.termSection, {backgroundColor: '#9575CD'}]} activeOpacity={0.8} onPress={this.toggleTX}>
                            <Text style={styles.termSectionText}>{this.state.showTX ? this.props.card.clinical_use : "Treatment"}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                <Animated.View style={[styles.buttonGroup,
                    {
                        transform:[
                            {translateY: this.state.buttonsY}
                        ]
                    }

                ]}>
                    <CircleButton
                        style={{backgroundColor:'#00EAB5', width:58, height:58, borderRadius:29}}
                        imgStyle={{width:30, height:30}}
                        src='/Users/cgray9/Documents/react-native/PharmCardsProject/img/check52.png'
                        onPress={this.check}/>
                    <CircleButton
                        style={{backgroundColor:'#607D8B', width:88, height:88, borderRadius:44}}
                        imgStyle={{width:64, height:64}}
                        src='/Users/cgray9/Documents/react-native/PharmCardsProject/img/refresh51.png'
                        onPress={this.flip}/>
                    <CircleButton
                        style={{backgroundColor:'#E91E63', width:58, height:58, borderRadius:29}}
                        imgStyle={{width:30, height:30}}
                        src='/Users/cgray9/Documents/react-native/PharmCardsProject/img/skip.png'
                        onPress={this.next}/>
                </Animated.View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    tilt: {
        overflow: 'hidden',
    },

    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CFD8DC',
        backfaceVisibility: 'hidden',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: 330,
        height: 420
    },

    titleText: {
        color: '#4A4A4A',
        fontSize: 30,
        fontFamily: 'Avenir Next'
    },

    termSection: {
        flex: 0.33,
        justifyContent: 'center',
        alignItems: 'center',
    },

    termSectionText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'Avenir Next'
    },

    buttonGroup: {
        flex: 0.01,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'transparent'
    }
})

module.exports = CardView;
