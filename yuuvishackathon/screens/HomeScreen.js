import React from "react";

import styles from "../config/styles";
import { View, Text } from "react-native";
// import { BlueButton, InverseButton } from "../components/Button";
import colors from "../config/colors"; // 1.0.0-beta.27
// import { getUserGroup, getGroups } from "../requests";
// import { Video } from "expo-av";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    };
  };

  state = {};

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
          HomeScreen
        </Text>
      </View>
    );
  }
}
export default HomeScreen;
