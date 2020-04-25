import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Animated, Image, Dimensions } from "react-native";


export default class LoadingScreen extends React.Component {
    state = {
        logoOpacity: new Animated.Value(0),
        // titleMarginTop: new Animated.Value(0)
    }

    async componentDidMount() {

        Animated.sequence([
            Animated.timing(this.state.logoOpacity, {
                toValue: 1,
                duration: 1500,
            }),
            // Animated.timing(this.state.titleMarginTop, {
            //     toValue: 1,
            //     duration: 2500,
            // })
        ]).start(() => {
            this.props.navigation.navigate('App')
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <Animated.Image source={require('../../assets/logo.png')}
                        style={{ ...styles.logo, opacity: this.state.logoOpacity }}>
                    </Animated.Image>
                    <Text style={{ color: '#8a773b', fontSize: 15, fontWeight: 'bold' }}>Ramzan Sharif</Text>
                </View>

                <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    {/* <Animated.Text
                        style={{ ...styles.title, marginTop: this.state.titleMarginTop }}>
                        Aridian Array Software Society
                </Animated.Text> */}
                    <Text style={{ color: '#3c3c3d' }}>From</Text>
                    <Text style={{ color: '#8a773b' }}>Aridian Array Software Society</Text>
                </View>

            </View>
        );
    }
}
const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
        backgroundColor:'green'
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        width: 400,
        fontSize: 21,
        color: 'green'

    },
    appName: {
        color: '#8a773b',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
