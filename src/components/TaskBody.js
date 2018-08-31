import React from "react";
import { number } from "prop-types";
import { Consumer } from "../context";
import { View, Text } from "react-native";

import moment from "moment";

import { taskType } from "../types";
import { fullFormat } from "../helpers/datetimeFormat";

// The component receive the task and display its
const TaskBody = ({ task }) => (
  <Consumer>
    {({ LANG: { from, to, withoutDate, importances } }) => (
      <View>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "#635f62" }}
        >
          {task.title}
        </Text>
        <Text style={{ color: "#635f62" }}>{task.text}</Text>
        {!task.finished ? (
          <Text style={{ textAlign: "center", color: "#635f62" }}>
            {from +
              ": " +
              (task.date ? moment(task.date).format(fullFormat) : withoutDate)}
          </Text>
        ) : (
          <Text style={{ textAlign: "center", color: "#635f62" }}>
            {to + ": " + moment(task.finished).format(fullFormat)}
          </Text>
        )}
      </View>
    )}
  </Consumer>
);

TaskBody.propTypes = {
  task: taskType.isRequired // Object of the task
};

export { TaskBody };
