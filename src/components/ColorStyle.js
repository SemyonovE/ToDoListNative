import React from "react";
import { connect } from "react-redux";
import { changeColorStyle } from "../actionCreator";

import { Icon } from "react-native-elements";

const ColorStyle = ({ colorStyle, changeColorStyle }) => (
  <Icon
    color="#444"
    name="adjust"
    type="font-awesome"
    underlayColor="transparent"
    onPress={() => changeColorStyle(colorStyle === "#fff" ? "#f5f5f5" : "#fff")}
  />
);

const WithConnect = connect(
  ({ setting: { colorStyle } }) => ({ colorStyle }),
  { changeColorStyle }
)(ColorStyle);

export { WithConnect as ColorStyle };
