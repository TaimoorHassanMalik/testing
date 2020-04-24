import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Switch, ImageBackground, Linking, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { CheckBox, } from 'react-native-elements'
import { Icon, Picker, Form } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from 'moment';
import { islamabad2020, lahore2020, faisalabad2020, multan2020, peshawar2020, karachi2020, queta2020 } from './hanafi'
import { islamabad2020Jafria, lahore2020Jafria, faisalabad2020Jafria, peshawar2020Jafria, multan2020Jafria, karachi2020Jafria, queta2020Jafria } from './jafria'
import PushNotification from 'react-native-push-notification'
import DateTimePickerModal from "react-native-modal-datetime-picker";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hanafi: true,
      jafria: false,
      alarm: false,
      toggle: false,
      alarmTime: [],
      myTime: false,
      isDatePickerVisible: false,
      // Hanafi data
      islamabad2020: islamabad2020,
      lahore2020: lahore2020,
      faisalabad2020: faisalabad2020,
      multan2020: multan2020,
      peshawar2020: peshawar2020,
      karachi2020: karachi2020,
      queta2020: queta2020,
      // Jafria data
      islamabad2020Jafria: islamabad2020Jafria,
      lahore2020Jafria: lahore2020Jafria,
      faisalabad2020Jafria: faisalabad2020Jafria,
      peshawar2020Jafria: peshawar2020Jafria,
      multan2020Jafria: multan2020Jafria,
      karachi2020Jafria: karachi2020Jafria,
      queta2020Jafria: queta2020Jafria,
      selected: "Islamabad",
      years: "2020",
      time: '',
      date: '',
      countRoza: 0,
      AwakeAlarm: '02:45 am',
      Sehri: '00:00',
      Iftar: '00:00',

    }
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
       
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  async UNSAFE_componentWillMount() {
    var monthNames = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date().getDate(); //Current Date
    var month = monthNames[new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear(); //Current Year
    // Getting the current date-time with required format and UTC   
    var time = moment()
      .utcOffset('+05:00')
      .format('hh:mm a');
    this.setState({
      time: time,
      date: date + ' ' + month + ' ' + year,
    });
    this.getRoza({ date, month })

  }

  async componentDidMount() {
    if (this.state.hanafi) {
      this.getTimeRozaHanafi()
    }
    if (this.state.jafria) {
      this.getTimeRozaJafria()
    }

    try {
      const value = await AsyncStorage.getItem('@mykey')
      const HanafiData = JSON.parse(await AsyncStorage.getItem('Hanafikey'))
      const jafriaData = JSON.parse(await AsyncStorage.getItem('jafriakey'))
      const myToggle = JSON.parse(await AsyncStorage.getItem('toggleKey'))

      if (value !== null) {
        this.setState({
          selected: await AsyncStorage.getItem('@mykey')
        })
      }
      if (HanafiData) {
        this.setState({
          hanafi: JSON.parse(await AsyncStorage.getItem('Hanafikey')),
          jafria: JSON.parse(await AsyncStorage.getItem('jafriakey'))
        })
      }
      if (jafriaData) {
        this.setState({
          jafria: JSON.parse(await AsyncStorage.getItem('jafriakey')),
          hanafi: JSON.parse(await AsyncStorage.getItem('Hanafikey')),

        })
      }
      if (myToggle) {
        this.setState({
          toggle: JSON.parse(await AsyncStorage.getItem('toggleKey'))
        })
      }
    } catch (e) {
      console.log('Any error ? ', e)
    }
  }

  alert = () => {
    Alert.alert(
      'Welcome: ',
      'Please Check Updates',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Update', onPress: () => this.openStore() },
      ],
      { cancelable: false }
    );
  }

  openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(`market://details?id=com.ramzaanuiit`).catch(err =>
        alert('Please check for the Google Play Store')
      );
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`
      ).catch(err => alert('Please check for the App Store'));
    }
  };

  componentDidUpdate(pP, pS, sS) {
    if (this.state.selected !== pS.selected || this.state.hanafi !== pS.hanafi) {
      if (this.state.hanafi) {
        this.getTimeRozaHanafi()
      } else {
        this.getTimeRozaJafria()
      }
    }
    const timeA = this.state.time.toString()
    const IftariTime = this.state.Iftar
    const SehriTime = this.state.Sehri
    const awakeTime = this.state.AwakeAlarm


    if (this.state.time !== pS.time) {
      if (timeA === IftariTime && this.state.toggle) {
        this.alarmPush()
      }
      if (timeA === SehriTime && this.state.toggle) {
        this.alarmPush()
      }
      if (timeA === awakeTime && this.state.toggle) {
        this.alarmPush()
      }
    }

  }


  getRoza = ({ date, month }) => {

    if (date == 25 && month == 'April') {
      this.setState({ countRoza: 1 })
    } if (date == 26 && month == 'April') {
      this.setState({ countRoza: 2 })
    } if (date == 27 && month == 'April') {
      this.setState({ countRoza: 3 })
    } if (date == 28 && month == 'April') {
      this.setState({ countRoza: 4 })
    } if (date == 29 && month == 'April') {
      this.setState({ countRoza: 5 })
    } if (date == 30 && month == 'May') {
      this.setState({ countRoza: 6 })
    } if (date == 1 && month == 'May') {
      this.setState({ countRoza: 7 })
    } if (date == 2 && month == 'May') {
      this.setState({ countRoza: 8 })
    } if (date == 3 && month == 'May') {
      this.setState({ countRoza: 9 })
    } if (date == 4 && month == 'May') {
      this.setState({ countRoza: 10 })
    } if (date == 5 && month == 'May') {
      this.setState({ countRoza: 11 })
    } if (date == 6 && month == 'May') {
      this.setState({ countRoza: 12 })
    } if (date == 7 && month == 'May') {
      this.setState({ countRoza: 13 })
    } if (date == 8 && month == 'May') {
      this.setState({ countRoza: 14 })
    } if (date == 9 && month == 'May') {
      this.setState({ countRoza: 15 })
    } if (date == 10 && month == 'May') {
      this.setState({ countRoza: 16 })
    } if (date == 11 && month == 'May') {
      this.setState({ countRoza: 17 })
    } if (date == 12 && month == 'May') {
      this.setState({ countRoza: 18 })
    } if (date == 13 && month == 'May') {
      this.setState({ countRoza: 19 })
    } if (date == 14 && month == 'May') {
      this.setState({ countRoza: 20 })
    } if (date == 15 && month == 'May') {
      this.setState({ countRoza: 21 })
    } if (date == 16 && month == 'May') {
      this.setState({ countRoza: 22 })
    } if (date == 17 && month == 'May') {
      this.setState({ countRoza: 23 })
    } if (date == 18 && month == 'May') {
      this.setState({ countRoza: 24 })
    } if (date == 19 && month == 'May') {
      this.setState({ countRoza: 25 })
    } if (date == 20 && month == 'May') {
      this.setState({ countRoza: 26 })
    } if (date == 21 && month == 'May') {
      this.setState({ countRoza: 27 })
    } if (date == 22 && month == 'May') {
      this.setState({ countRoza: 28 })
    } if (date == 23 && month == 'May') {
      this.setState({ countRoza: 29 })
    } if (date == 24 && month == 'May') {
      this.setState({ countRoza: 30 })
    }
  }

  getTimeRozaHanafi = () => {
    const { islamabad2020, lahore2020, faisalabad2020, multan2020, peshawar2020, karachi2020, queta2020 } = this.state

    if (this.state.selected == 'Islamabad' && this.state.years == '2020') {
      const newArray = islamabad2020.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Lahore' && this.state.years == '2020') {
      const newArray = lahore2020.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Faisalabad' && this.state.years == '2020') {
      const newArray = faisalabad2020.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Multan' && this.state.years == '2020') {
      const newArray = multan2020.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Peshawar' && this.state.years == '2020') {
      const newArray = peshawar2020.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Karachi' && this.state.years == '2020') {
      const newArray = karachi2020.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Quetta' && this.state.years == '2020') {
      const newArray = queta2020.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
  }

  getTimeRozaJafria = () => {
    const { islamabad2020Jafria, lahore2020Jafria, faisalabad2020Jafria, peshawar2020Jafria, multan2020Jafria, karachi2020Jafria, queta2020Jafria } = this.state

    if (this.state.selected == 'Islamabad' && this.state.years == '2020') {
      const newArray = islamabad2020Jafria.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Lahore' && this.state.years == '2020') {
      const newArray = lahore2020Jafria.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Faisalabad' && this.state.years == '2020') {
      const newArray = faisalabad2020Jafria.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Multan' && this.state.years == '2020') {
      const newArray = multan2020Jafria.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Peshawar' && this.state.years == '2020') {
      const newArray = peshawar2020Jafria.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Karachi' && this.state.years == '2020') {
      const newArray = karachi2020Jafria.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
    if (this.state.selected == 'Quetta' && this.state.years == '2020') {
      const newArray = queta2020Jafria.map(item => {
        var rozaId = item.rozaId
        var sehri = item.sehri
        var iftari = item.iftari
        if (rozaId == this.state.countRoza) {
          this.setState({ Sehri: sehri, Iftar: iftari })
        }
      })
    }
  }

  hanafiHandle = async () => {
    // this.setState({ hanafi: true, jafria: false, alarm: false })

    try {
      await AsyncStorage.setItem('Hanafikey', JSON.stringify(true)),
        await AsyncStorage.setItem('jafriakey', JSON.stringify(false)),

        this.setState({
          hanafi: JSON.parse(await AsyncStorage.getItem('Hanafikey')),
          jafria: JSON.parse(await AsyncStorage.getItem('jafriakey')),
          alarm: false
        })
    } catch (error) {
      console.log('Any Error ? ', error)
    }

  }

  jafriaHandle = async () => {
    // this.setState({ jafria: true, hanafi: false, alarm: false })
    try {
      await AsyncStorage.setItem('jafriakey', JSON.stringify(true)),
        await AsyncStorage.setItem('Hanafikey', JSON.stringify(false)),

        this.setState({
          jafria: JSON.parse(await AsyncStorage.getItem('jafriakey')),
          hanafi: JSON.parse(await AsyncStorage.getItem('Hanafikey')),
          alarm: false
        })
    } catch (error) {
      console.log('Any Error ? ', error)
    }

  }

  onValueChange = async (value) => {
    try {
      await AsyncStorage.setItem('@mykey', value)
      this.setState({
        selected: await AsyncStorage.getItem('@mykey')
      })
    } catch (error) {
      console.log('Any Error ? ', error)
    }
  }



  onYearChange = (value) => {
    this.setState({
      years: value
    });
  }
  toggleSwitch = async () => {
    if (!this.state.toggle) {
      await AsyncStorage.setItem('toggleKey', JSON.stringify(true))
      this.setState({
        toggle: JSON.parse(await AsyncStorage.getItem('toggleKey'))
      })
    } else {
      await AsyncStorage.setItem('toggleKey', JSON.stringify(false))
      this.setState({
        toggle: JSON.parse(await AsyncStorage.getItem('toggleKey'))
      })
    }
  }

  hanafi = () => {
    const { islamabad2020, lahore2020, faisalabad2020, multan2020, peshawar2020, karachi2020, queta2020 } = this.state

    if (this.state.selected == 'Islamabad' && this.state.years == '2020') {
      return (
        <FlatList
          data={islamabad2020}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Lahore' && this.state.years == '2020') {
      return (
        <FlatList
          data={lahore2020}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Faisalabad' && this.state.years == '2020') {
      return (
        <FlatList
          data={faisalabad2020}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Multan' && this.state.years == '2020') {
      return (
        <FlatList
          data={multan2020}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Peshawar' && this.state.years == '2020') {
      return (
        <FlatList
          data={peshawar2020}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Karachi' && this.state.years == '2020') {
      return (
        <FlatList
          data={karachi2020}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Quetta' && this.state.years == '2020') {
      return (
        <FlatList
          data={queta2020}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.years == '2021' || this.state.years == '2022') {
      return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginTop: 8, marginHorizontal: 2 }}>
          <ImageBackground
            source={require("./assets/3.jpg")}
            style={{ width: '100%', height: '100%', borderRadius: 20 }}
          >
            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 35, marginTop: 25 }}>
              <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>Data Not Updated Yet</Text>
            </View>
          </ImageBackground>
        </View>

      )
    }

  };


  ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          height: 0
        }}
      />
    )
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.section}>
          <View style={[styles.icon, { backgroundColor: this.state.hanafi ? '#FFD700' : 'lightgreen' }]}>
            <Text style={{ color: '3c3c3d', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>{item.rozaId}</Text>
          </View>
          <View style={styles.input}>
            <Text style={{ color: this.state.hanafi ? '#8a773b' : 'green', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{item.date}</Text>
            <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Sehri {item.sehri}  |  Iftar {item.iftari}  </Text>
          </View>
        </View>
      </View>

    )
  }


  jafria = () => {
    const { islamabad2020Jafria, lahore2020Jafria, faisalabad2020Jafria, peshawar2020Jafria, multan2020Jafria, karachi2020Jafria, queta2020Jafria } = this.state

    if (this.state.selected == 'Islamabad' && this.state.years == '2020') {
      return (
        <FlatList
          data={islamabad2020Jafria}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Lahore' && this.state.years == '2020') {
      return (
        <FlatList
          data={lahore2020Jafria}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Faisalabad' && this.state.years == '2020') {
      return (
        <FlatList
          data={faisalabad2020Jafria}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Multan' && this.state.years == '2020') {
      return (
        <FlatList
          data={multan2020Jafria}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Peshawar' && this.state.years == '2020') {
      return (
        <FlatList
          data={peshawar2020Jafria}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Karachi' && this.state.years == '2020') {
      return (
        <FlatList
          data={karachi2020Jafria}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.selected == 'Quetta' && this.state.years == '2020') {
      return (
        <FlatList
          data={queta2020Jafria}
          renderItem={this.renderItem}
          keyExtractor={item => item.rozaId}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    if (this.state.years == '2021' || this.state.years == '2022') {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginHorizontal: 2, marginTop: 8 }}>
          <ImageBackground
            source={require("./assets/3.jpg")}
            style={{ width: '100%', height: '100%', borderRadius: 20 }}
          >
            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 35, marginTop: 25 }}>
              <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>Data Not Updated Yet</Text>
            </View>
          </ImageBackground>
        </View>
      )
    }
  };

  alarm = () => {
    this.setState({ hanafi: false, jafria: false, alarm: true })
  }

  alarmPush = () => {
    PushNotification.localNotification({
      ticker: 'Alarm Active',
      title: "Ramzaan Sharif", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      message: "Alarm", // (required)
      playSound: true,
      soundName: 's.mp3',
      vibrate: true,
      vibration: 900,
      autoCancel: true,
    });
  }

  Alarmtoggle = (iftariTime) => {
    PushNotification.localNotificationSchedule({
      ticker: 'Alarm Active',
      title: "Ramzaan Sharif",
      message: "Alarm", // (required)
      date: new Date(Date.now() + (300 * 1000)),//5 mints
      playSound: true,
      soundName: 'bansuri.mp3',
      vibrate: true,
      vibration: 300,
      autoCancel: true,
      bigText: 'Alarm',
      ongoing: false,
      number: '10',
      id: '123',
    });
    alert('Alarm set, iftari set')
    const d = new Date(Date.now() + (300 * 1000))
    console.log('ye time ', d)
    const a = moment().format('LTS')
    console.log('ye aa ', a)
    console.log('ye kuch', this.state.date)
    console.log('ye mila ', iftariTime)
  }

  Alarm5mint = () => {
    PushNotification.localNotificationSchedule({
      ticker: 'Alarm Active',
      title: "Ramzaan Sharif",
      message: "Alarm", // (required)
      date: new Date(Date.now() + (300 * 1000)),//5 mints
      playSound: true,
      soundName: 'bansuri.mp3',
      vibrate: true,
      vibration: 300,
      autoCancel: true,
      bigText: 'Alarm',
      ongoing: false,
      number: '10',
      id: '123',
    });
    alert('Alarm set, 5min from now')
    this.setState({ hanafi: true, jafria: false, alarm: false, toggle: true })
  }

  Alarm10mint = () => {
    PushNotification.localNotificationSchedule({
      ticker: 'Alarm Active',
      title: "Ramzaan Sharif",
      message: "Alarm", // (required)
      date: new Date(Date.now() + (600 * 1000)),//10 mints
      playSound: true,
      soundName: 'bansuri.mp3',
      vibrate: true,
      vibration: 300,
      autoCancel: true,
      bigText: 'Alarm',
      ongoing: false,
      number: '10',
      id: '123',
    });
    alert('Alarm set, 10min from now')
    this.setState({ hanafi: true, jafria: false, alarm: false, toggle: true })
  }

  Alarm15mint = () => {
    PushNotification.localNotificationSchedule({
      ticker: 'Alarm Active',
      title: "Ramzaan Sharif",
      message: "Alarm", // (required)
      date: new Date(Date.now() + (900 * 1000)),//15 mints
      playSound: true,
      soundName: 'bansuri.mp3',
      vibrate: true,
      vibration: 300,
      autoCancel: true,
      bigText: 'Alarm',
      ongoing: false,
      number: '10',
      id: '123',
    });
    alert('Alarm set, 15min from now')
    this.setState({ hanafi: true, jafria: false, alarm: false, toggle: true })
  }

  testSche = (date) => {
    PushNotification.localNotificationSchedule({
      ticker: 'Alarm Active',
      title: "Ramzaan Sharif",
      message: "Alarm", // (required)
      date: date, // in 60 secs
      playSound: true,
      soundName: 's.mp3',
      vibrate: true,
      vibration: 300,
      autoCancel: true,
      bigText: 'Alarm',
      ongoing: false,
      id: '123',
    });
    console.log('ye chala bhai')
  }

  stopAlarm = () => {
    PushNotification.localNotification({
      id: '123'
    });
    PushNotification.cancelAllLocalNotifications({ id: '123' });
  }
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true })
  };
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false })
  };
  handleConfirm = date => {
    this.setState({ alarmTime: date, myTime: true })
    this.testSche(date)
    this.hideDatePicker();
  };
  alarmDetails = () => {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("./assets/3.jpg")}
          style={{ width: '100%', height: '100%' }}
        >

          <View style={[styles.details, { marginTop: 15 }]}>


            {this.state.myTime ?
              <View style={[styles.circleTime, { width: 170, height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={{ color: 'white', fontSize: 13, textAlign: 'center' }}>{this.state.alarmTime.toString()}</Text>
              </View> :
              <View style={[styles.circleTime, { width: 120, height: 40, borderRadius: 5 }]}>
                <Text style={{ color: 'white', fontSize: 18 }}>{this.state.time}</Text>
              </View>
            }

            <TouchableOpacity onPress={this.stopAlarm}>
              <MaterialIcons name="delete-forever" color="red" size={30} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.circleTime, { width: 70, height: 30, borderRadius: 5, backgroundColor: 'lightgreen' }]} onPress={this.showDatePicker}>
              <Text style={{ color: '3c3c3d', fontSize: 14, fontWeight: 'bold' }}>Set Alarm</Text>
            </TouchableOpacity>
          </View>

          {/* second row */}
          <View style={[styles.details, { marginTop: 15 }]}>

            <TouchableOpacity style={[styles.circleTime, { width: 80, height: 40, borderRadius: 5 }]} onPress={this.Alarm5mint}>
              <Text style={{ color: 'white', fontSize: 18 }}>5mint</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.circleTime, { width: 80, height: 40, borderRadius: 5 }]} onPress={this.Alarm10mint}>
              <Text style={{ color: 'white', fontSize: 18 }}>10mint</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.circleTime, { width: 80, height: 40, borderRadius: 5 }]} onPress={this.Alarm15mint}>
              <Text style={{ color: 'white', fontSize: 18 }}>15mint</Text>
            </TouchableOpacity>

          </View>

          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="time"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
          />
        </ImageBackground>
      </View>

    )

  }

  render() {


    setTimeout(() => {
      this.setState({
        time: moment().utcOffset('+05:00').format('hh:mm a')
      })
    }, 6000)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View style={styles.checkOption}>
                < CheckBox
                  title='Fiqa Hanafi'
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={this.state.hanafi}
                  onPress={this.hanafiHandle}
                />
              </View>

              <View style={[styles.checkOption, { marginTop: 10 }]}>
                <CheckBox
                  title='Fiqa Jafria'
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={this.state.jafria}
                  onPress={this.jafriaHandle}
                />
              </View>

            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View style={styles.listOptions}>
                <Form>
                  <Picker
                    mode="dropdown"
                    iosHeader="Select your SIM"
                    iosIcon={<Icon name="arrow-down" style={{ color: "#007aff", fontSize: 25 }} />}

                    style={{ width: undefined, }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange}
                  >
                    <Picker.Item label="Islamabad" value="Islamabad" />
                    <Picker.Item label="Lahore" value="Lahore" />
                    <Picker.Item label="Faisalabad" value="Faisalabad" />
                    <Picker.Item label="Multan" value="Multan" />
                    <Picker.Item label="Peshawar" value="Peshawar" />
                    <Picker.Item label="Karachi" value="Karachi" />
                    <Picker.Item label="Quetta" value="Quetta" />
                  </Picker>
                </Form>
              </View>


              <View style={[styles.listOptions, { marginTop: 10 }]}>
                <Form>
                  <Picker
                    mode="dropdown"
                    iosHeader="Select your SIM"
                    iosIcon={<Icon name="arrow-down" style={{ color: "#007aff", fontSize: 25 }} />}

                    style={{ width: undefined, }}
                    selectedValue={this.state.years}
                    onValueChange={this.onYearChange}
                  >
                    <Picker.Item label="Year 2020" value="2020" />
                    <Picker.Item label="Year 2021" value="2021" />
                    <Picker.Item label="Year 2022" value="2022" />
                  </Picker>
                </Form>
              </View>

            </View>
          </View>
        </View>

        <View style={styles.ViewMid}>
          <View style={styles.status}>
            <View style={[styles.icon, { backgroundColor: this.state.hanafi ? '#FFD700' : 'lightgreen' }]}>
              <Text style={{ color: '3c3c3d', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Roza</Text>
              {this.state.years == '2020' ?
                <Text style={{ color: '3c3c3d', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>{this.state.countRoza}</Text>
                :
                <Text style={{ color: '3c3c3d', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>0</Text>
              }

            </View>
            <View style={styles.input} >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Today's Time:   {this.state.selected}</Text>
              <Text style={{ color: 'yellow', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>Time: {this.state.time}    Date: {this.state.date}</Text>
              {this.state.years == '2020' ?
                <Text style={{ color: 'yellow', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}> Sehri:  {this.state.Sehri}  |  Iftar: {this.state.Iftar} </Text>
                :
                <Text style={{ color: 'yellow', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}> Sehri:  00:00  |  Iftar: 00:00  </Text>
              }
            </View>
          </View>
        </View>




        <View style={styles.details}>
          <View style={[styles.city, { width: 130 }]}>
            <Text style={{ color: 'white', fontSize: 18 }}>{this.state.selected.toUpperCase()}</Text>
          </View>
          {/* <TouchableOpacity style={[styles.city, { width: 60 }]} onPress={this.alert}>
            <Text style={{ color: 'white', fontSize: 13 }}>Update</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={[styles.city, { width: 60 }]} onPress={this.alarm}>
            <Text style={{ color: 'white', fontSize: 13 }}>Clock</Text>
          </TouchableOpacity>
          <View ><Text style={{ fontSize: 13 }}>Activate Siren</Text></View>
          <TouchableOpacity style={[styles.city, { width: 55, backgroundColor: 'lightgray' }]} onPress={this.alarm}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={this.state.toggle ? "green" : "red"}
              size={19}
              ios_backgroundColor="#3c3c3d"
              onValueChange={this.toggleSwitch}
              value={this.state.toggle}
            />
          </TouchableOpacity>
        </View>

        {/* Ye Footer Hai */}
        <View style={styles.footer}>
          <View style={styles.footer}>
            {this.state.hanafi ? this.hanafi() : null}
            {this.state.jafria ? this.jafria() : null}
            {this.state.alarm ? this.alarmDetails() : null}
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1.2,
    backgroundColor: '#3c3c3d',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOption: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 160,
    height: 52.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listOptions: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 160,
    height: 52,
  },
  ViewMid: {
    flex: 0.7,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#3c3c3d',
    borderRadius: 10,
  },
  details: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    // backgroundColor:'green'
  },
  city: {
    backgroundColor: '#3c3c3d',
    width: 50,
    height: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  footer: {
    flex: 3,
    // paddingHorizontal: 10,
    backgroundColor: '#3c3c3d',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 5,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  section: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 340,
    height: 90,
    marginTop: 10,
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
    justifyContent: 'center'
  },
  circleTime: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#3c3c3d'
  }
})
export default App

