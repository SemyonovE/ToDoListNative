import React from "react";
import { arrayOf, number } from "prop-types";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";

import { Task } from "./";

import XOR from "../helpers/XOR";
import { taskType } from "../types";
import sorterForTasklist from "../helpers/sorterForTasklist";

const TasksList = ({
  taskslist,
  filterKey,
  displayMode,
  sorterMode,
  tasklistStyle: style,
  colorStyle,
  tabIndexDefault
}) => (
  <View
    style={{
      flex: 1
    }}
  >
    <ScrollView>
      {/* Filtering tasks by importance | Filtering tasks by complete | Sort | Create component for each task */}
      {taskslist
        .filter(task => filterKey < 0 || +task.importance === filterKey)
        .filter(task => displayMode < 0 || !XOR(task.finished, displayMode))
        .sort((first, second) => sorterForTasklist(first, second, sorterMode))
        .map((task, i) => (
          <View
            key={task.id}
            style={{
              backgroundColor: i % 2 === 0 ? colorStyle : "white"
            }}
          >
            <Task task={task} />
          </View>
        ))}
    </ScrollView>
  </View>
);

TasksList.propTypes = {
  taskslist: arrayOf(taskType.isRequired).isRequired, // Object of the task
  displayMode: number.isRequired, // Number of the filter parameter
  filterKey: number.isRequired, // Number of the filter parameter
  sorterMode: number.isRequired, // Number of the sort parameter
  tasklistStyle: number.isRequired // Parameter of the task list mode
};

const WithConnect = connect(
  ({
    taskslist,
    setting: {
      filterKey,
      sorterMode,
      displayMode,
      tasklistStyle,
      colorStyle,
      tabIndexDefault
    }
  }) => ({
    taskslist,
    filterKey,
    sorterMode,
    displayMode,
    tasklistStyle,
    colorStyle,
    tabIndexDefault
  })
)(TasksList);

export { WithConnect as TasksList };
