import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class DailyPrays extends Component {
    render() {
        return (
            <View style={styles.conatiner}>
                <Text> DailyPrays</Text>
                <ActionButton buttonColor="#E9446A" onPress={this.props.navigation.openDrawer} offsetX={10} offsetY={10} >
        </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
})
