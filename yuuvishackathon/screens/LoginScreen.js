import React from "react";

import styles from "../config/styles";
import { View, Text } from "react-native";
// import { BlueButton, InverseButton } from "../components/Button";
import colors from "../config/colors"; // 1.0.0-beta.27
// import { getUserGroup, getGroups } from "../requests";
// import { Video } from "expo-av";
import { Button } from "react-native-elements";
class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    };
  };

  state = {};
  handleButtonPress = () => {
    this.props.navigation.navigate("LoginScreen");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 50,
            margin: 20
          }}
        >
          LoginScreen
        </Text>
      
      </View>
    );
  }
}
export default LoginScreen;
