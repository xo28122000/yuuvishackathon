import React from "react";

import styles from "../config/styles";
import { View, Text } from "react-native";
// import { BlueButton, InverseButton } from "../components/Button";
import colors from "../config/colors"; // 1.0.0-beta.27
import { Button, Input } from "react-native-elements";

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
      /* These values are used instead of the shared configuration! */
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
          Login
        </Text>
        <Input
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "chevron-left" }}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "chevron-left" }}
        />
      </View>
    );
  }
}
export default LoginScreen;
