import React from "react";
import { bool, string, func, oneOfType } from "prop-types";
import { connect } from "react-redux";
import { loadingFromServer } from "../actionCreator";
import { Consumer } from "../context";
import { View, TextInput, Button, Styled } from "react-native";
import {
  Text,
  FormLabel,
  FormValidationMessage,
  Icon
} from "react-native-elements";

import { requestToServer } from "../helpers/workWithServer";

const style = {
  margin: 5,
  marginTop: 10,
  borderBottomColor: "lightgray",
  borderBottomWidth: 1,
  color: "gray",
  fontSize: 20
};

class LoginModal extends React.Component {
  state = {
    login: "",
    password: ""
  };

  render = (
    { login, password } = this.state,
    { loading, error } = this.props
  ) => (
    <Consumer>
      {({ LANG: { loginModalTitles } }) => (
        <View>
          <Text h4 style={{ textAlign: "center" }}>
            {loginModalTitles.title}
          </Text>
          <FormLabel>{loginModalTitles.login}</FormLabel>
          <TextInput
            style={style}
            value={login}
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={text => this.setState({ login: text.toLowerCase() })}
          />
          <FormLabel>{loginModalTitles.password}</FormLabel>
          <TextInput
            style={style}
            textContentType="password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />
          <View
            style={{
              flexDirection: "row",
              justyfiContent: "space-between"
            }}
          >
            <View style={{ flex: 1 }}>
              <Button
                title={loginModalTitles.forgot}
                onPress={() => this.forgotPassword()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Icon
                name={loading ? "clock-o" : "sign-in"}
                underlayColor="transparent"
                type="font-awesome"
                onPress={() => {
                  if (!loading) {
                    this.checkFields();
                    this.handleComing();
                  }
                }}
              />
            </View>
          </View>
          {error && (
            <FormValidationMessage>
              {loginModalTitles.error}: {error}
            </FormValidationMessage>
          )}
        </View>
      )}
    </Consumer>
  );

  checkFields = ({ login, password } = this.state) => {
    if (!login || !password) return;

    const reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
    if (!reg.test(login.toLowerCase())) {
      alert("Incorrect email!");
      return;
    }
    return true;
  };

  handleComing = ({ login, password } = this.state) => {
    const data = {
      email: login,
      password: password
    };

    this.props.loadingFromServer(data, true);
  };

  forgotPassword = ({ login, password } = this.state) => {
    if (login && password) {
      if (!this.checkFields()) return;
      alert("You should receive a message on your email");
      requestToServer({
        email: login,
        forget: password
      });
    } else {
      alert("Set your email and new password");
    }
  };
}

LoginModal.propTypes = {
  loading: bool, // Loading state
  error: oneOfType([bool.isRequire, string.isRequire]), // Error message
  loadingFromServer: func // Function for loading of the tasks and the setting
};

const WithConnect = connect(
  ({ user: { loading, error } }) => ({ loading, error }),
  { loadingFromServer }
)(LoginModal);

export { WithConnect as LoginModal };
