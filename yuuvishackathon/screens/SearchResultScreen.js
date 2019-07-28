import React from "react";

import styles from "../config/styles";
import { View, Text, Button } from "react-native";
// import { BlueButton, InverseButton } from "../components/Button";
import colors from "../config/colors"; // 1.0.0-beta.27
// import { getUserGroup, getGroups } from "../requests";
// import { Video } from "expo-av";
import { Header, SearchBar } from "react-native-elements";

import NavigationBar from "../components/NavigationBar";
import Search from "../components/Search";

class SearchResultScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
      /* These values are used instead of the shared configuration! */
    };
  };

  state = {};

  //   handleButtonPress = () => {
  //     this.props.navigation.navigate("LoginScreen");
  //   };

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar />
        <Text>SearchResultScreen</Text>
      </View>
    );
  }
}
export default SearchResultScreen;
