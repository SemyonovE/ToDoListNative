import React from "react";
import store from "../store";
import { Provider } from "react-redux";
import { View } from "react-native";

import { MainWrapperApp } from "./";

const Root = () => (
  <View style={{ flex: 1 }}>
    <Provider store={store}>
      <MainWrapperApp />
    </Provider>
  </View>
);

export { Root };
