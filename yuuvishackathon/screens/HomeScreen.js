import React from "react";
import styles from "../config/styles";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
// import { BlueButton, InverseButton } from "../components/Button";
import colors from "../config/colors"; // 1.0.0-beta.27
// import { getUserGroup, getGroups } from "../requests";
// import { Video } from "expo-av";
import {
  Header,
  SearchBar,
  ButtonGroup,
  Avatar,
  Icon,
  Badge,
  Image
} from "react-native-elements";
import { CircularButton, BlueButton } from "../components/Button";
import NavigationBar from "../components/NavigationBar";
import Search from "../components/Search";
// import { AudioRecorder, AudioUtils } from "react-native-audio";
// import SoundRecorder from "react-native-sound-recorder";
import Expo, { Asset, FileSystem, Font } from "expo";
import * as Permissions from "expo-permissions";

import { Video } from "expo-av";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
      /* These values are used instead of the shared configuration! */
    };
  };
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: false,
      // isLoading: false,
      // isPlaybackAllowed: false,
      // muted: false,
      // soundPosition: null,
      // soundDuration: null,
      // recordingDuration: null,
      // shouldPlay: false,
      // isPlaying: false,
      // isRecording: false,
      // fontLoaded: false,
      // shouldCorrectPitch: true,
      // volume: 1.0,
      // rate: 1.0,
      record: false,
      welcometextcolor: "black",
      RecordText: "RECORD",
      selectedIndex: 2
    };
  }

  handleRecordButtonPress = () => {
    this.toggleRecord();
    this.clearScreen();
    // this.startRecording();
    console.log(this.state.record);
  };

  // startRecording = async () => {
  //   Audio.setAudioModeAsync;
  //   const recording = new Audio.Recording();

  //   try {
  //     await recording.prepareToRecordAsync(
  //       Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
  //     );
  //     recording.setOnRecordingStatusUpdate(
  //       this._updateScreenForRecordingStatus
  //     );
  //     this.recording = recording;

  //     console.log("now recording");
  //     // You are now recording!
  //   } catch (error) {
  //     console.log(error);
  //     // An error occurred!
  //   }
  // };

  handleHistoryButtonPress = () => {
    this.props.navigation.navigate("ViewAll");
  };
  toggleRecord = () => {
    this.setState(prevState => ({
      record: !prevState.record
    }));
    if (!this.state.record) {
      this.setState({ RecordText: "Go Back" });
    } else {
      this.setState({ RecordText: "RECORD" });
    }
  };
  clearScreen = () => {
    if (this.state.record) {
      this.setState({ welcometextcolor: "black" });
    } else {
      this.setState({ welcometextcolor: "white" });
    }
  };
  DisplayHistoryButton = () => {
    if (this.state.record) {
      return (
        <View>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              margin: 0
            }}
          >
            <Video
              source={require("../assets/live-mp4.mp4")}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{ width: "20%", height: "30%" }}
            />
          </View>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.state.selectedIndex}
            buttons={["Cancel", "Done and Send"]}
            containerStyle={{ height: 100 }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <BlueButton label="History" onPress={this.handleHistoryButtonPress} />
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              margin: 0
            }}
          >
            <Video
              source={require("../assets/ideacloud.mp4")}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{ width: "30%", height: "30%" }}
            />
          </View>
        </View>
      );
    }
  };

  updateIndex = selectedIndex => {
    this.setState({ selectedIndex: 3 });

    this.toggleRecord();
    this.clearScreen();
  };

  componentDidMount() {
    this._askForPermissions();
  }
  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === "granted"
    });
  };

  // _onRecordPressed = () => {
  //   if (this.state.isRecording) {
  //     this._stopRecordingAndEnablePlayback();
  //   } else {
  //     this._stopPlaybackAndBeginRecording();
  //   }
  // };
  // async _stopRecordingAndEnablePlayback() {
  //   this.setState({
  //     isLoading: true
  //   });
  //   try {
  //     await this.recording.stopAndUnloadAsync();
  //   } catch (error) {
  //     // Do nothing -- we are already unloaded.
  //   }
  //   const info = await FileSystem.getInfoAsync(this.recording.getURI());
  //   console.log(`FILE INFO: ${JSON.stringify(info)}`);
  //   await Audio.setAudioModeAsync({
  //     allowsRecordingIOS: false,
  //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  //     playsInSilentModeIOS: true,
  //     playsInSilentLockedModeIOS: true,
  //     shouldDuckAndroid: true,
  //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
  //   });
  //   const { sound, status } = await this.recording.createNewLoadedSound(
  //     {
  //       isLooping: true,
  //       isMuted: this.state.muted,
  //       volume: this.state.volume,
  //       rate: this.state.rate,
  //       shouldCorrectPitch: this.state.shouldCorrectPitch
  //     },
  //     this._updateScreenForSoundStatus
  //   );
  //   this.sound = sound;
  //   this.setState({
  //     isLoading: false
  //   });
  // }
  // async _stopPlaybackAndBeginRecording() {
  //   this.setState({
  //     isLoading: true
  //   });
  //   if (this.sound !== null) {
  //     await this.sound.unloadAsync();
  //     this.sound.setOnPlaybackStatusUpdate(null);
  //     this.sound = null;
  //   }
  //   await Audio.setAudioModeAsync({
  //     allowsRecordingIOS: true,
  //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  //     playsInSilentModeIOS: true,
  //     shouldDuckAndroid: true,
  //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
  //   });
  //   if (this.recording !== null) {
  //     this.recording.setOnRecordingStatusUpdate(null);
  //     this.recording = null;
  //   }

  //   const recording = new Audio.Recording();
  //   await recording.prepareToRecordAsync(this.recordingSettings);
  //   recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

  //   this.recording = recording;
  //   await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
  //   this.setState({
  //     isLoading: false
  //   });
  // }

  render() {
    const appicon = (
      <Avatar rounded source={require("../assets/AppIcon.png")} />
    );
    return (
      <View>
        <Header
          leftComponent={appicon}
          // centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={
            <View>
              <Avatar rounded source={require("../assets/user.png")} />

              <Badge
                value={3}
                status="error"
                containerStyle={{ position: "absolute", top: -4, right: -4 }}
              />
            </View>
          }
          barStyle="dark-content"
          containerStyle={{ height: "10%", backgroundColor: "#428AF8" }}
        />
        <View
          style={{
            margin: 5,
            // marginTop: 10,

            padding: 20,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              margin: 5,
              padding: 5,
              marginBottom: 20,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* <Text
              style={{
                padding: 20,
                fontSize: 30,
                letterSpacing: 10,
                fontWeight: "bold",
                color: this.state.welcometextcolor
              }}
            >
              Welcome
            </Text> */}

            <Image
              source={require("../assets/AppName2.png")}
              style={{ width: 300, height: 100 }}
              resizeMode="contain"
            />
            {/* <Text
              style={{
                padding: 20,
                fontSize: 30,
                letterSpacing: 10,
                fontWeight: "bold",
                color: this.state.welcometextcolor
              }}
            >
              Jainam!
            </Text> */}
          </View>

          <TouchableOpacity
            style={{
              width: "100%",
              height: "20%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.TORCH_RED,
              marginBottom: 40,

              paddingVertical: 12,
              borderRadius: 50,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "rgba(255,255,255,0.7)"
            }}
            onPress={this.handleRecordButtonPress}
          >
            <Text
              style={{
                color: colors.WHITE,
                textAlign: "left",
                height: 20,
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 3
              }}
            >
              {this.state.RecordText}
            </Text>
          </TouchableOpacity>
          {/* <BlueButton
            label={this.state.RecordText}
            onPress={this.handleRecordButtonPress}
          /> */}
          {this.DisplayHistoryButton()}
        </View>
      </View>
    );
  }
}

export default HomeScreen;
