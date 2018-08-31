import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { addTask } from "../actionCreator";
import { Consumer } from "../context";
import { View } from "react-native";
import { Icon } from "react-native-elements";

import { FormTaskData } from "./";

import hashCode from "../helpers/hashCode";
import { initTask } from "../helpers/initialParameters";

// The component send created task to reducer for addition the task to list
class CreateTask extends React.Component {
  state = initTask;

  render = () => (
    <Consumer>
      {({ LANG: { emptyTitle } }) => (
        <View style={{ flex: 1 }}>
          <Icon
            underlayColor="transparent"
            name="plus-circle"
            type="font-awesome"
            onPress={() => this.addTaskToList(emptyTitle)}
          />
          <FormTaskData
            task={this.state}
            reverseFlowFunction={obj => this.setState(obj)}
          />
          <Icon
            underlayColor="transparent"
            name="plus-circle"
            type="font-awesome"
            onPress={() => this.addTaskToList(emptyTitle)}
          />
        </View>
      )}
    </Consumer>
  );

  addTaskToList = (emptyTitle, task = this.state) => {
    //Validation of fields of the task
    if (!task.title.trim().length) {
      alert(emptyTitle + "!");
      return;
    }

    // Change store by add the task with generating the unique id for the new task
    this.props.addTask({
      ...task,
      id: hashCode(task.title + task.text + task.date + task.importance)
    });

    // Clear the task and fields of creating form
    this.setState(initTask);
  };
}

CreateTask.propTypes = {
  addTask: func.isRequired // Function for creating a new task
};

const WithConnect = connect(
  null,
  { addTask }
)(CreateTask);

export { WithConnect as CreateTask };
