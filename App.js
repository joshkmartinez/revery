import React, { Component } from "react";

import {
  AppRegistry,
  View,
  StyleSheet,
  PixelRatio,
  Linking,
  Platform,
  TouchableHighlight
} from "react-native";

import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider, Button, Text } from "react-native-ui-kitten";

import { ViroVRSceneNavigator } from "react-viro";

let sharedProps = {
  apiKey: "8165581D-B36A-4FEF-B7AD-C1E650B60C03" // They dont even use my api key? The app works without it...
};

let LongTermModeScene = require("./js/LongTermModeVR");
let EmergencyModeScene = require("./js/EmergencyModeVR");

let UNSET = "UNSET";
let VR_NAVIGATOR_TYPE_LONG_TERM = "VR_LONG_TERM";
let VR_NAVIGATOR_TYPE_EMERGENCY = "VR_EMERGENCY";

let defaultNavigatorType = UNSET;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getVRNavigatorLongTerm = this._getVRNavigatorLongTerm.bind(this);
    this._getVRNavigatorEmergency = this._getVRNavigatorEmergency.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
  }

  // Render different screens based on experience type.
  render() {
    if (this.state.navigatorType == VR_NAVIGATOR_TYPE_LONG_TERM) {
      return this._getVRNavigatorLongTerm();
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE_EMERGENCY) {
      return this._getVRNavigatorEmergency();
    }
    // this happens if (this.state.navigatorType == UNSET)
    return this._getExperienceSelector();
  }

  dialCall = number => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      //for IOS
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  // Home screen - where the user chooses an experience
  _getExperienceSelector() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <View style={localStyles.outer}>
          <View style={localStyles.inner}>
            <View style={{ padding: 10 }}>
              <Text
                category="h4"
                adjustsFontSizeToFit
                numberOfLines={1}
                styles={localStyles.titleText}
              >
                Welcome to The Embrace
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text category="s1" adjustsFontSizeToFit numberOfLines={1}>
                Please choose your desired experience:
              </Text>
            </View>
            <View style={{ padding: 20 }}>
              <Button
                onPress={this._getExperienceButtonOnPress(
                  VR_NAVIGATOR_TYPE_LONG_TERM
                )}
                size="large"
                status="info"
              >
                Long Term Mode
              </Button>
            </View>
            {/* TODO: Change to the suicide hotline number*/}
            <Button
              size="large"
              status="info"
              /*onPress={this._getExperienceButtonOnPress(
                VR_NAVIGATOR_TYPE_EMERGENCY
              )}*/
              onPress={() => this.dialCall(123456789)}
            >
              Emergency Mode
            </Button>
          </View>
        </View>
      </ApplicationProvider>
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigatorLongTerm() {
    return (
      <ViroVRSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: LongTermModeScene }}
        onExitViro={this._exitViro}
      />
    );
  }

  _getVRNavigatorEmergency() {
    return (
      <ViroVRSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: EmergencyModeScene }}
        onExitViro={this._exitViro}
      />
    );
  }

  // This function returns an anonymous/lambda function to be used by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

let localStyles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  titleText: {
    padding: 30,
    color: "#123456",
    textAlign: "center"
  },

  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

module.exports = App;
