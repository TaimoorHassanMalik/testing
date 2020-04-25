//import liraries
import React from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native'
import { DrawerNavigatorItems } from 'react-navigation-drawer'

// create a component
class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        state = {
        }
    }

    render() {

        return (
            // <View style={{ flex: 1 }}>
            //     <View style={{ flex: 3, flexDirection: 'row', backgroundColor: 'red' }}>

            // <Image source={require('../../assets/logo.png')} style={styles.profile} />

            // <View style={{ alignItems: 'baseline', justifyContent: 'space-evenly', marginTop: 20 }} >
            //     <Text style={styles.name}>Ramzan Sharif</Text>
            // </View>

            //     </View>

            // <View style={styles.container}>
            //     <DrawerNavigatorItems {...this.props} />
            // </View>
            // </View>
            <View style={styles.container}>
                <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                    <Image source={require('../../assets/logo.png')} style={styles.profile} />
                    <View style={{ alignItems: 'baseline', justifyContent: 'space-evenly', marginTop: 20 }} >
                        <Text style={styles.name}>Ramzan Sharif</Text>
                    </View>
                </View>
                <View style={{ flex: 3, backgroundColor: 'white' }}>
                    <DrawerNavigatorItems {...this.props} />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#FB862F' // #414272  #FB862F
    },
    name: {
        color: '#8a773b',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: -4
    }
});

//make this component available to the app
export default Sidebar;
