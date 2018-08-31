import React from "react";
import { bool, string, func, oneOfType } from "prop-types";
import { View, Text } from "react-native";
import { App } from "./App";
import { connect } from "react-redux";
import { loadingFromServer } from "../actionCreator";
import { Provider } from "../context";

import moment from "moment";
import "moment/locale/ru";

import { LoginModal, Login } from "./";

import LANG from "../helpers/dictionary";
import { getCookies } from "../helpers/workWithCookies";

const momentSetting = { week: { dow: 1 } };

class MainWrapperApp extends React.Component {
  componentDidMount = () => {
    getCookies().then(userdata => {
      if (typeof userdata === "object") {
        this.props.loadingFromServer(userdata);
      }
    });
  };

  state = ((layout = this.props.language) => ({
    lang: layout,
    LANG: LANG[layout]
  }))();

  componentWillReceiveProps(nextProps) {
    nextProps.language !== this.props.language &&
      this.setState({
        lang: nextProps.language,
        LANG: LANG[nextProps.language]
      });
  }

  render = ({ lang } = this.state, { login } = this.props) => {
    moment.updateLocale(lang, momentSetting);

    return (
      <Provider value={this.state}>
        <View
          style={{
            marginTop: 20,
            flex: 1,
            justifyContent: "center"
          }}
        >
          {login ? (
            <View style={{ flex: 1 }}>
              <App />
              <Login />
            </View>
          ) : (
            <LoginModal />
          )}
        </View>
      </Provider>
    );
  };
}

MainWrapperApp.propTypes = {
  login: oneOfType([bool.isRequire, string.isRequire]), // Email of the user
  language: string, // Language of the App ( "ru" or "en" )
  loadingFromServer: func // Function for saga activate
};

const WithConnect = connect(
  ({ user: { login }, setting: { language } }) => ({
    login,
    language
  }),
  { loadingFromServer }
)(MainWrapperApp);

export { WithConnect as MainWrapperApp };
