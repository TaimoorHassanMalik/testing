import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { CheckBox, Divider } from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PraysOfAshras extends Component {
    render() {
        return (
            <View style={styles.conatiner}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.Title}>
                        <View style={styles.input}>
                            <Text style={{ color: '#8a773b', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>PRAYS OF ASHRAS</Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={[styles.icon, { backgroundColor: '#FFD700' }]}>
                            <Text style={{ color: '#3c3c3d', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>1</Text>
                        </View>
                        <View style={styles.input}>
                            <Text style={{ color: '#8a773b', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغيثُ</Text>
                            <Divider style={{ backgroundColor: '#FFD700', marginTop: 5, marginBottom: 5 }} />
                            <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>اے زندہ اور قائم رب! میں تیری رحمت کے حصول کی فریاد کرتا ہوں </Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={[styles.icon, { backgroundColor: '#FFD700' }]}>
                            <Text style={{ color: '#3c3c3d', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>2</Text>
                        </View>
                        <View style={styles.input}>
                            <Text style={{ color: '#8a773b', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>اَسْتَغْفِرُ اللہَ رَبِّی مِنْ کُلِّ زَنْبٍ وَّ اَتُوْبُ اِلَیْہِ</Text>
                            <Divider style={{ backgroundColor: '#FFD700', marginTop: 5, marginBottom: 5 }} />
                            <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>میرے رب! میں اپنے گناہوں کی مغفرت چاہتا ہوں اور تیری جانب پلٹتا (توبہ کرتا) ہوں۔</Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={[styles.icon, { backgroundColor: '#FFD700' }]}>
                            <Text style={{ color: '#3c3c3d', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>3</Text>
                        </View>
                        <View style={styles.input}>
                            <Text style={{ color: '#8a773b', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>اَللَّهُمَّ أَجِرْنِي مِنَ النَّارِ</Text>
                            <Divider style={{ backgroundColor: '#FFD700', marginTop: 5, marginBottom: 5 }} />
                            <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>اے اللہ! مجھے آگ کے عذاب سے بچا لے۔</Text>
                        </View>
                    </View>
                </View>
                <ActionButton buttonColor="#E9446A" onPress={this.props.navigation.openDrawer}
                    offsetX={10}
                    offsetY={10}
                    size={40}
                    nativeFeedbackRippleColor='green'
                    fixNativeFeedbackRadius={true}

                >
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#3c3c3d'
    },
    Title: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 340,
        height: 40,
        marginTop: -20,
        elevation: 20
    },
    section: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        width: 340,
        height: 150,
        marginTop: 10,
        // elevation: 20
    },
    icon: {
        paddingRight: 17,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: '#FFD700',
        borderRadius: 10
    },
    input: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 5
    },
})
