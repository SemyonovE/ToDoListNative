import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { Consumer } from "../context";
import { View, TextInput, Text, DatePickerIOS } from "react-native";
import { FormLabel, FormInput } from "react-native-elements";

import moment from "moment";

import { SelectForm } from "./";

import { taskType } from "../types";
import { fullFormat } from "../helpers/datetimeFormat";

// The component send created task to reducer for addition the task to list
const FormTaskData = ({
  task,
  tasklistStyle,
  reverseFlowFunction: f,
  withTasklistStyle
}) => (
  <Consumer>
    {({ LANG: { titles, importances, language } }) => (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FormLabel>{titles.title}</FormLabel>
          <FormInput
            value={task.title}
            onChangeText={text => f({ title: text })}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FormLabel>{titles.text}</FormLabel>
          <FormInput
            multiline
            inputStyle={{ paddingRight: 25 }}
            value={task.text}
            multyline
            onChangeText={text => f({ text: text })}
          />
        </View>
        <View style={{ flex: 4 }}>
          <FormLabel>{titles.date}</FormLabel>
          <FormInput
            value={task.date ? moment(task.date).format(fullFormat) : ""}
            onChangeText={text =>
              f({
                date: moment(text, fullFormat).isValid()
                  ? moment(text, fullFormat).toISOString()
                  : ""
              })
            }
          />
          <DatePickerIOS
            style={{ backgroundColor: "#efdbb2", marginTop: 10 }}
            node="datetime"
            locale={language}
            date={(task.date && moment(task.date).toDate()) || new Date()}
            onDateChange={date => f({ date: date.toISOString() })}
          />
        </View>
        <View style={{ flex: 4 }}>
          <FormLabel>{titles.importance}</FormLabel>
          <SelectForm
            title={titles.importance}
            changeFunction={value => f({ importance: String(value) })}
            currentValue={+task.importance}
            options={[
              { value: 0, title: importances[1] },
              { value: 1, title: importances[2] },
              { value: 3, title: importances[3] }
            ]}
          />
        </View>
      </View>
    )}
  </Consumer>
);

FormTaskData.propTypes = {
  task: taskType.isRequired, // Object of the task
  reverseFlowFunction: func.isRequired // Function for reverse data flow for some changes in the parent's node
};

const WithConnect = connect(({ setting: { tasklistStyle } }) => ({
  tasklistStyle
}))(FormTaskData);

export { WithConnect as FormTaskData };
