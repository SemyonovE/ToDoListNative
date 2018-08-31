import React from "react";
import { number, func } from "prop-types";
import { connect } from "react-redux";
import { changeTabIndexDefault } from "../actionCreator";
import { View, ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";

import { Filter, EmptyTab, Sorter, CreateTask } from "./";

const colorIcon = "#8a908c";
const ArrayOfMenuElements = ["minus", "plus", "filter", "sort-amount-asc"];

const NavigationTab = ({ tabIndexDefault, changeTabIndexDefault }) => (
  <View
    style={{
      flex: tabIndexDefault === 0 ? 0.07 : 10,
      paddingTop: 5,
      shadowColor: "lightgray",
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 5 },
      backgroundColor: "white",
      zIndex: 999
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "nowrap"
      }}
    >
      {ArrayOfMenuElements.map((el, i) => (
        <Icon
          key={i}
          name={el}
          color={colorIcon}
          underlayColor="transparent"
          type="font-awesome"
          onPress={() => changeTabIndexDefault(i)}
        />
      ))}
    </View>
    <ScrollView style={{ flex: 1 }}>
      {tabIndexDefault === 1 && <CreateTask />}
      {tabIndexDefault === 2 && <Filter />}
      {tabIndexDefault === 3 && <Sorter />}
    </ScrollView>
  </View>
);

NavigationTab.propTypes = {
  tabIndexDefault: number.isRequired, // The parameter of the value of opened tab
  changeTabIndexDefault: func.isRequired // Function for change the parameter of opened tab
};

const WithConnect = connect(
  ({ setting: { tabIndexDefault } }) => ({
    tabIndexDefault
  }),
  { changeTabIndexDefault }
)(NavigationTab);

export { WithConnect as NavigationTab };
