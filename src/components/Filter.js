import React from "react";
import { number, func } from "prop-types";
import { connect } from "react-redux";
import { Consumer } from "../context";
import { changeDisplayMode, changeFilter } from "../actionCreator";
import { View } from "react-native";
import { Icon } from "react-native-elements";

import { SelectForm } from "./";

import { settingDefault } from "../helpers/initialParameters";

const Filter = ({
  changeFilter,
  filterKey,
  displayMode,
  changeDisplayMode
}) => (
  <Consumer>
    {({ LANG: { importances, displayMods, filterTitles } }) => (
      <View>
        <SelectForm
          title={filterTitles[0]}
          changeFunction={changeFilter}
          currentValue={filterKey}
          options={[
            { value: -1, title: importances[0] },
            { value: 0, title: importances[1] },
            { value: 1, title: importances[2] },
            { value: 3, title: importances[3] }
          ]}
        />
        <SelectForm
          title={filterTitles[1]}
          changeFunction={changeDisplayMode}
          currentValue={displayMode}
          options={[
            { value: -1, title: displayMods[0] },
            { value: 0, title: displayMods[1] },
            { value: 1, title: displayMods[2] }
          ]}
        />
        <Icon
          underlayColor="transparent"
          name="repeat"
          type="font-awesome"
          onPress={() => {
            changeFilter(settingDefault.filterKey);
            changeDisplayMode(settingDefault.displayMode);
          }}
        />
      </View>
    )}
  </Consumer>
);

Filter.propTypes = {
  filterKey: number.isRequired, // Number for filtering by importance
  displayMode: number.isRequired, // Number for filtering by complete
  changeFilter: func.isRequired, // Function for change one of the parameter of the filter
  changeDisplayMode: func.isRequired // Function for change one of the parameter of the filter
};

const WithConnect = connect(
  ({ setting: { filterKey, displayMode } }) => ({ filterKey, displayMode }),
  { changeFilter, changeDisplayMode }
)(Filter);

export { WithConnect as Filter };
