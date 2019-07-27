import React from "react";

import styles from "../config/styles";
import { View, Text } from "react-native";
import colors from "../config/colors"; // 1.0.0-beta.27
import { Button, Header, SearchBar } from "react-native-elements";

import Search from "../components/Search";

class NavigationBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          placement="left"
          leftComponent={{ icon: "menu", color: "#fff" }}
          rightComponent={{ icon: "account-circle", color: "#fff" }}
        />
      </View>
    );
  }
}
export default NavigationBar;
