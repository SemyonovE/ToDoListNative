import React from "react";
import { number } from "prop-types";
import { connect } from "react-redux";

import moment from "moment";
import { View } from "react-native";

import { TaskEditor, TaskBody, TaskHeader } from "./";
import { Card } from "react-native-elements";
import { taskType } from "../types";

// The component receive the task and display its
class Task extends React.Component {
  // Default mode for editing is 'not editing'
  state = {
    editMode: false
  };

  render = ({ task, tasklistStyle } = this.props) => (
    <View
      style={{
        padding: 10,
        backgroundColor: task.finished
          ? "#d3ffce"
          : moment(task.date) > moment() || !task.date
            ? "transparent"
            : "#ffd5d5",
        borderBottomColor: "lightgray",
        borderBottomWidth: 1
      }}
    >
      {!this.state.editMode ? (
        <View>
          <TaskHeader task={task} toggleEditMode={this.toggleEditMode} />
          <TaskBody task={task} />
        </View>
      ) : (
        <TaskEditor task={task} toggleEditMode={this.toggleEditMode} />
      )}
    </View>
  );

  toggleEditMode = () => {
    this.setState(pS => ({
      editMode: !pS.editMode
    }));
  };
}

Task.propTypes = {
  task: taskType.isRequired, // Object of the task
  tasklistStyle: number.isRequired // Parameter of the task list mode
};

const WithConnect = connect(({ setting: { tasklistStyle } }) => ({
  tasklistStyle
}))(Task);

export { WithConnect as Task };
