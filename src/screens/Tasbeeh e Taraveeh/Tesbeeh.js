import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Tesbeeh extends Component {
    render() {
        return (
            <View style={styles.conatiner}>
                <Text> Tasbeeh </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
