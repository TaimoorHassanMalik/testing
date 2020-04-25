import React from 'react'
import { Dimensions } from 'react-native'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from './src/screens/LoadingScreen';
//Inside Sidebar pages
import SideBar from './src/screens/SideBar'
import HomeScreen from './src/screens/Home Screen/HomeScreen'
import DailyPrays from './src/screens/Daily Prays/DailyPrays'
import Hadees from './src/screens/Hadees/hadees'
import OtherPrays from './src/screens/OtherPrays/OtherPrays'
import Tasbeeh from './src/screens/Tasbeeh e Taraveeh/Tesbeeh'
import PraysOfAshras from './src/screens/PraysOfAshras/PraysOfAshras'



// Drawer Items here
const AppContainer = createStackNavigator(
  {

    default: createDrawerNavigator({
      HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
          title: 'Home',
          drawerIcon: ({ tintColor }) => <Icon name="md-home" size={30} color={tintColor} />
        }
      },

      DailyPrays: {
        screen: DailyPrays,
        navigationOptions: {
          title: 'Daily Prays',
          drawerIcon: ({ tintColor }) => <Icon name="md-reorder" size={30} color={tintColor} />
        }
      },
      Hadees: {
        screen: Hadees,
        navigationOptions: {
          title: 'Ahadees',
          drawerIcon: ({ tintColor }) => <Icon name="md-settings" size={30} color={tintColor} />
        }
      },
      Tasbeeh: {
        screen: Tasbeeh,
        navigationOptions: {
          title: 'Tasbeeh of Taravi',
          drawerIcon: ({ tintColor }) => <Icon name="ios-paper" size={30} color={tintColor} />
        }
      },
      PraysOfAshras: {
        screen: PraysOfAshras,
        navigationOptions: {
          title: 'Prays of Ashras',
          drawerIcon: ({ tintColor }) => <Icon name="ios-people" size={30} color={tintColor} />
        }
      },
      OtherPrays: {
        screen: OtherPrays,
        navigationOptions: {
          title: 'Other Prays',
          drawerIcon: ({ tintColor }) => <Icon name="ios-call" size={30} color={tintColor} />
        }
      },
    },
      {
        contentComponent: props => < SideBar {...props} />,

        drawerWidth: Dimensions.get('window').width * 0.80,
        // hideStatusBar: false,

        contentOptions: {
          // activeBackgroundColor: '#FB862F', //blue #414272 yellow #FB862F
          // activeTintColor: '#FFF', //Text Color inner 
          // inactiveTintColor:'gray',
          itemsContainerStyle: {
            marginTop: 10,
            marginHorizontal: 8
          },
          itemStyle: {
            borderRadius: 15,
            // backgroundColor:'gray',
            marginTop: -3
          }

        }
      }),

  },
  {
    mode: "model",
    headerMode: "none",
    // initialRouteName:"HomeScreen"
  }
)


export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
    },
    {
      initialRouteName: "Loading"
    }
  )
);