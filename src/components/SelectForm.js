import React from "react";
import { string, func, number, arrayOf } from "prop-types";
import { Text, Picker, View } from "react-native";

import { optionType } from "../types";

const SelectForm = (
  { title, changeFunction, options, currentValue } = this.props
) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#efdbb2",
      marginTop: 10,
      marginBottom: 10
    }}
  >
    <Picker
      selectedValue={currentValue}
      onValueChange={itemValue => changeFunction(itemValue)}
    >
      {options.map(option => (
        <Picker.Item
          key={option.value}
          value={option.value}
          label={option.title}
        />
      ))}
    </Picker>
  </View>
);

SelectForm.propTypes = {
  title: string.isRequired, // Text of the title of the select
  changeFunction: func.isRequired, // Function for changing parameter
  currentValue: number.isRequired, // Value of the current selected option
  options: arrayOf(optionType.isRequired).isRequired // Array of the options for the select
};

export { SelectForm };
