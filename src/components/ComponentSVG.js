import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button, Animated, StyleSheet } from 'react-native';
import Svg, { LinearGradient, Rect, Defs, Stop } from 'react-native-svg';

export default class SvgAnimatedLinearGradient extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.state = {
            animationStarted: false, // controla se a animação está em execução
        };
    }

    startLoopAnimation = () => {
        this.setState({ animationStarted: true }, () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(this.animatedValue, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: false,
                    }),
                    Animated.timing(this.animatedValue, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        });
    };

    render() {
        const { width, height } = this.props;

        // Interpola as cores com base na animação
        const color1 = this.animatedValue.interpolate({
            inputRange: [0, 0],
            outputRange: ['#8A2BE2', '#000080'], // Oscila entre roxo e azul escuro
        });

        const color2 = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['#FF1493', '#8A2BE2'], // Oscila entre rosa e roxo
        });

        const color3 = this.animatedValue.interpolate({
            inputRange: [0, 2],
            outputRange: ['#000080', '#FF1493'], // Oscila entre azul escuro e rosa
        });

        return (
            <View style={styles.container}>
                <Svg width={width} height={height}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="2" y2="0">
                            <Stop offset="0%" stopColor={color1.__getValue()} />
                            <Stop offset="50%" stopColor={color2.__getValue()} />
                            <Stop offset="100%" stopColor={color3.__getValue()} />
                        </LinearGradient>
                    </Defs>
                    <Rect x="0" y="0" width={width} height={height} fill="url(#grad)" />
                </Svg>

                {!this.state.animationStarted && (
                    <Button title="Iniciar Animação" onPress={this.startLoopAnimation} />
                )}
            </View>
        );
    }
}

SvgAnimatedLinearGradient.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

SvgAnimatedLinearGradient.defaultProps = {
    width: 300,
    height: 200,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
