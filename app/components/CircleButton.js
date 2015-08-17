'use strict';

var React = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} = React;

var CircleButton = React.createClass({
    render: function() {
        return(
            <TouchableHighlight style={[styles.circleButton, this.props.style]} onPress={this.props.onPress} underlayColor={this.props.style.backgroundColor}>
                <Image style={[styles.image, this.props.imgStyle]} source={{isStatic:true, uri: this.props.src}}/>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    circleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#607D8B',
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4
    },

    image: {
        width: 26,
        height: 26
    }

})

module.exports = CircleButton;
