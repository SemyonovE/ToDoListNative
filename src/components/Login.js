import React from "react";
import { string, func } from "prop-types";
import { connect } from "react-redux";
import { userLogOut } from "../actionCreator";
import { Consumer } from "../context";
import { View } from "react-native";
import { Icon } from "react-native-elements";

import { ColorStyle, Language, TaskListStyle } from "./";

import { removeCookies } from "../helpers/workWithCookies";

const Login = ({ userLogOut, login }) => (
  <View
    style={{
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      shadowColor: "lightgray",
      shadowOpacity: 0.5,
      shadowRadius: 1,
      shadowOffset: { width: 0, height: -2 },
      backgroundColor: "white",
      zIndex: 999
    }}
  >
    <View style={{ flex: 1 }}>
      <Language />
    </View>
    <View style={{ flex: 1 }}>
      <ColorStyle />
    </View>
    <Consumer>
      {({ LANG: { exitButtonTooltip } }) => (
        <View style={{ flex: 1 }}>
          <Icon
            color="#444"
            name="sign-out"
            underlayColor="transparent"
            type="font-awesome"
            onPress={() => {
              removeCookies();
              userLogOut();
            }}
          />
        </View>
      )}
    </Consumer>
  </View>
);

Login.propTypes = {
  login: string.isRequired, // Email of the user
  userLogOut: func.isRequired // Function for logout
};

const WithConnect = connect(
  ({ user: { login } }) => ({ login }),
  { userLogOut }
)(Login);
export { WithConnect as Login };
