import React from "react";

import styles from "../config/styles";
import { View, Text } from "react-native";
import { Button, Header, SearchBar } from "react-native-elements";

class Search extends React.Component {
  state = {
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={this.state.search}
      />
    );
  }
}
export default Search;
