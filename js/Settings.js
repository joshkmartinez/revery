"use strict";

import React, { Component, AsyncStorage } from "react"; //this async storage is deprecated
//import AsyncStorage from "@react-native-community/async-storage";
import { StyleSheet, View } from "react-native";
import { mapping, light as lightTheme } from "@eva-design/eva";
import {
  ApplicationProvider,
  Button,
  Text,
  Radio
} from "react-native-ui-kitten";

//Links to both the image and call settings
const ImageSelection = require("ImageSelection.js");
const CallSettings= require("CallSettings.js");


let UNSET = "UNSET";
let NAVIGATOR_TYPE_IMAGE_SELECTOR = "IMAGE_SELECTOR";
let NAVIGATOR_TYPE_CALL_SETTINGS = "CALL_SETTINGS";

export default class Settings extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType = this.navigatorType;

    };

  }


  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Text>Settings</Text>
        {/* It will probably end up looking someting like this
        <Radio
        checked={this.state.}
        onChange={this.onChangeTest(!this.state.testEnabled)}
      />*/}
      </ApplicationProvider>
    );
  }
}

var styles = StyleSheet.create({
  testStyle: {
    color: "white"
  }
});

module.exports = Settings;
