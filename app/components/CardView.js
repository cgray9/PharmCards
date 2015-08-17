'use strict';
var CircleButton = require('../components/CircleButton');
var React = require('react-native');
var {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} = React;

var CardView = React.createClass({
    getInitialState() {
        return {
            theta: new Animated.Value(0),
            flipped: false,
            showMOA: false,
            showSE: false,
            showTx: false,
        };
    },

    componentDidMount() {
        //this.flip();
    },

    flip(){
        var flipToValue = this.state.flipped ? 0 : 180
        this.setState({ flipped: ! this.state.flipped })
        Animated.timing(this.state.theta, {
            toValue: flipToValue,
            duration: 1000
        }).start();
    },

    toggleMOA(){
        this.setState({ showMOA: ! this.state.showMOA })
    },

    toggleSE(){
        this.setState({ showSE: ! this.state.showSE })
    },

    toggleTX(){
        this.setState({ showTX: ! this.state.showTX })
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
                    alignItems: 'stretch',
                    transform: [
                        {perspective: 850},
                        {rotateX: this.state.theta.interpolate({
                            inputRange: [0, 180],
                            outputRange: ['180deg', '360deg']
                        })}
                    ]}
                ]}>
                    <TouchableOpacity style={[styles.termSection, {backgroundColor: '#512DA8'}]} activeOpacity={0.8} onPress={this.toggleMOA}>
                        <Text style={styles.termSectionText}>{this.state.showMOA ? "Decrease aqueous humor synthesis  via inhibition of carbonic anhydrase" : "Mechanism of Action"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.termSection, {backgroundColor: '#673AB7'}]} activeOpacity={0.8} onPress={this.toggleSE}>
                        <Text style={styles.termSectionText}>{this.state.showSE ? "No pupillary or vision change" : "Side Effects"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.termSection, {backgroundColor: '#9575CD'}]} activeOpacity={0.8} onPress={this.toggleTX}>
                        <Text style={styles.termSectionText}>{this.state.showTX ? "Glaucoma" : "Treatment"}</Text>
                    </TouchableOpacity>
                </Animated.View>
                <View style={styles.buttonGroup}>
                    <CircleButton
                        style={{backgroundColor:'#00EAB5', width:58, height:58, borderRadius:29}}
                        imgStyle={{width:30, height:30}}
                        src='/Users/cgray9/Documents/react-native/PharmCardsProject/img/check52.png'/>
                    <CircleButton
                        style={{backgroundColor:'#607D8B', width:88, height:88, borderRadius:44}}
                        imgStyle={{width:64, height:64}}
                        src='/Users/cgray9/Documents/react-native/PharmCardsProject/img/refresh51.png'
                        onPress={this.flip}/>
                    <CircleButton
                        style={{backgroundColor:'#E91E63', width:58, height:58, borderRadius:29}}
                        imgStyle={{width:30, height:30}}
                        src='/Users/cgray9/Documents/react-native/PharmCardsProject/img/skip.png'/>
                </View>
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
        marginRight: 20
    }
})

module.exports = CardView;
