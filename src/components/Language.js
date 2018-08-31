import React from "react";
import { connect } from "react-redux";
import { changeLanguage } from "../actionCreator";
import { Icon } from "react-native-elements";

const Language = ({ changeLanguage }) => (
  <Icon
    color="#444"
    name="book"
    type="font-awesome"
    underlayColor="transparent"
    onPress={changeLanguage}
  />
);

const WithConnect = connect(
  null,
  { changeLanguage }
)(Language);

export { WithConnect as Language };
