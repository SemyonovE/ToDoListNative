import React from "react";
import { View } from "react-native";

import { TasksList, NavigationTab } from "./";

const App = () => (
  <View style={{ flex: 1 }}>
    <NavigationTab />
    <TasksList />
  </View>
);

export { App };
