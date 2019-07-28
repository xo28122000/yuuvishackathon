import React from "react";
import { AppLoading, Permissions } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation"; // 1.0.0-beta.27
// import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
// import GroupScreen from './screens/GroupScreen';
// import LocationCheckScreen from './screens/LocationCheckScreen';
// import TripScreen from './screens/TripScreen';
// import EndRideScreen from './screens/EndRideScreen';
import colors from "./config/colors";
import ViewAllScreen from "./screens/ViewAllScreen";
import { NativeModules } from "react-native";
// module.exports = NativeModules.ReactNativeRecordSound;
// import MyWebViewScreen from './screens/MyWebViewScreen';
// import CreateGroup from './screens/CreateGroup';

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    ViewAll: {
      screen: ViewAllScreen
    }
    // GroupScreen: {
    //   screen: GroupScreen,
    // },
    // LoginScreen: {
    //   screen: LoginScreen
    // }
    // LocationCheckScreen: {
    //   screen: LocationCheckScreen,
    // },
    // TripScreen: {
    //   screen: TripScreen,
    // },
    // EndRideScreen: {
    //   screen: EndRideScreen,
    // },
    // MyWebViewScreen: {
    //   screen: MyWebViewScreen,
    // },
    // CreateGroup: {
    //   screen: CreateGroup,
    // },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.BLACK
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
