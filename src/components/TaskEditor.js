import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { editTask } from "../actionCreator";
import { Consumer } from "../context";
import { View } from "react-native";
import { Icon } from "react-native-elements";

import { FormTaskData } from "./";

import { taskType } from "../types";

class TaskEditor extends React.Component {
  state = {
    ...this.props.task
  };

  render = (task = this.state) => (
    <View style={{ paddingBottom: 20 }}>
      <FormTaskData
        task={task}
        withTasklistStyle
        reverseFlowFunction={obj => this.setState(obj)}
      />
      <Consumer>
        {({
          LANG: { setChangesTooltip, cancelChangesTooltip, emptyTitle }
        }) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Icon
                name="check"
                type="font-awesome"
                onPress={() => this.editCurrentTask(emptyTitle)}
              />
            </View>
            <View>
              <Icon
                name="reply"
                type="font-awesome"
                onPress={this.props.toggleEditMode}
              />
            </View>
          </View>
        )}
      </Consumer>
    </View>
  );

  editCurrentTask = (emptyTitle, { editTask, toggleEditMode } = this.props) => {
    //Validation of fields of the task
    if (!this.state.title.trim().length) {
      alert(emptyTitle + "!");
      return;
    }

    editTask(this.state);

    toggleEditMode();
  };
}

TaskEditor.propTypes = {
  task: taskType.isRequired, // Object of the task
  toggleEditMode: func.isRequired, // Function for toggle of edit mode
  editTask: func.isRequired // Function for edit the task
};

const WithConnect = connect(
  null,
  { editTask }
)(TaskEditor);

export { WithConnect as TaskEditor };
