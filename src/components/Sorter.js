import React from "react";
import { number, func } from "prop-types";
import { connect } from "react-redux";
import { changeSorter } from "../actionCreator";
import { Consumer } from "../context";
import { View } from "react-native";
import { Icon } from "react-native-elements";

import { SelectForm } from "./";

import { settingDefault } from "../helpers/initialParameters";

const Sorter = ({ changeSorter, sorterMode }) => (
  <Consumer>
    {({ LANG: { sorterTitle, sorters } }) => (
      <View>
        <SelectForm
          title={sorterTitle}
          changeFunction={changeSorter}
          currentValue={sorterMode}
          options={[
            { value: -1, title: sorters[0] },
            { value: 1, title: sorters[1] },
            { value: 2, title: sorters[2] },
            { value: 3, title: sorters[3] },
            { value: 4, title: sorters[4] }
          ]}
        />
        <Icon
          underlayColor="transparent"
          name="repeat"
          type="font-awesome"
          onPress={() => changeSorter(settingDefault.sorterMode)}
        />
      </View>
    )}
  </Consumer>
);

Sorter.propTypes = {
  sorterMode: number.isRequired, // Number for mode of sorting
  changeSorter: func.isRequired // Function for change the parameter of the sort
};

const WithConnect = connect(
  ({ setting: { sorterMode } }) => ({ sorterMode }),
  { changeSorter }
)(Sorter);

export { WithConnect as Sorter };
