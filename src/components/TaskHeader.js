import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { deleteTask, editTask } from "../actionCreator";
import { Consumer } from "../context";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

import moment from "moment";

import { taskType } from "../types";

// The component receive the task and display its
class TaskHeader extends React.Component {
  render = ({ task, deleteTask, editTask } = this.props) => {
    const importance = "!".repeat(+task.importance);

    return (
      <Consumer>
        {({
          LANG: {
            importanceTooltip,
            editTTaskooltip,
            completeTaskTooltip,
            incompleteTaskTooltip,
            deleteTaskTooltip,
            daysLeftTooltip
          }
        }) => (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "nowrap",
              paddingBottom: 10
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "#8b0000",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                {importance || "ø"}
              </Text>
            </View>
            {!task.finished ? (
              <View style={{ flex: 2, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Icon
                    color="#0055a4"
                    underlayColor="transparent"
                    name="edit"
                    type="font-awesome"
                    onPress={this.props.toggleEditMode}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Icon
                    color="#92ae4f"
                    backgroundColor="white"
                    underlayColor="transparent"
                    name="check-square-o"
                    type="font-awesome"
                    onPress={() =>
                      editTask({
                        ...task,
                        ...{ finished: String(moment().toISOString()) }
                      })
                    }
                  />
                </View>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <Icon
                  color="#92ae4f"
                  name="square-o"
                  underlayColor="transparent"
                  type="font-awesome"
                  onPress={() => editTask({ ...task, ...{ finished: "" } })}
                />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Icon
                color="#a91818"
                name="close"
                underlayColor="transparent"
                type="font-awesome"
                onPress={() => deleteTask(task.id)}
              />
            </View>
          </View>
        )}
      </Consumer>
    );
  };
}

TaskHeader.propTypes = {
  task: taskType.isRequired, // Object of the task
  toggleEditMode: func.isRequired, // Function for toggle of edit mode
  deleteTask: func.isRequired, // Finction for delete of the task
  editTask: func.isRequired // Function for edit of the task
};

const WithConnect = connect(
  null,
  { deleteTask, editTask }
)(TaskHeader);

export { WithConnect as TaskHeader };
