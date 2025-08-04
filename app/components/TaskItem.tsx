import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  dateAdded: string;
}

interface TaskItemProps {
  task: Task;
  onToggleCompletion: (id: string) => void;
  onUpdateTask: (id: string, newText: string) => void;
  onDeleteTask: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleCompletion,
  onUpdateTask,
  onDeleteTask,
  isSelected,
  onSelect,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(task.text);

  const handlePress = () => {
    if (isSelected) {
      onSelect(task.id);
    }
  };

  const handleLongPress = () => {
    onSelect(task.id);
  };

  const handleUpdate = () => {
    if (editedText.trim()) {
      onUpdateTask(task.id, editedText.trim());
      setIsEditing(false);
    } else {
      Alert.alert("Invalid Input", "Task text cannot be empty.");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete "${task.text}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDeleteTask(task.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      onLongPress={handleLongPress}
      accessibilityLabel={`Task: ${task.text}`}
      accessibilityHint="Press and hold to select the task"
    >
      <View
        style={[
          styles.taskContainer,
          isSelected && styles.selectedTaskContainer,
        ]}
      >
        <View style={styles.taskHeader}>
          <TouchableOpacity
            onPress={() => onToggleCompletion(task.id)}
            accessibilityLabel={
              task.completed
                ? "Mark task as incomplete"
                : "Mark task as complete"
            }
            accessibilityHint="Toggles the completion status of the task"
          >
            {task.completed ? (
              <Icon name="checkbox" size={24} color="#FEFEFA" />
            ) : (
              <Icon name="square-outline" size={24} color="#FEFEFA" />
            )}
          </TouchableOpacity>

          {!isEditing ? (
            <Text
              style={[
                styles.taskText,
                task.completed && styles.taskTextCompleted,
              ]}
            >
              {task.text}
            </Text>
          ) : (
            <TextInput
              style={styles.editInput}
              value={editedText}
              onChangeText={setEditedText}
              onSubmitEditing={handleUpdate}
              autoFocus
              accessibilityLabel="Edit task text input"
              accessibilityHint="Modify the task text and press confirm"
            />
          )}

          {isSelected && !isEditing && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
              accessibilityLabel="Edit task"
              accessibilityHint="Opens editing mode for the task"
            >
              <Icon name="create-outline" size={20} color="#021526" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.taskDate}>
          Added on: {new Date(task.dateAdded).toLocaleString()}
        </Text>

        {isSelected && !isEditing && (
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
              accessibilityLabel="Delete task"
              accessibilityHint="Deletes the task"
            >
              <Icon name="trash-outline" size={20} color="#E2E2B6" />
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        {isEditing && (
          <View style={styles.editButtonsContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleUpdate}
              accessibilityLabel="Confirm edit"
              accessibilityHint="Saves the edited task text"
            >
              <Icon name="checkmark-done-outline" size={20} color="#E2E2B" />
              <Text style={styles.editButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelEditButton}
              onPress={() => {
                setIsEditing(false);
                setEditedText(task.text);
              }}
              accessibilityLabel="Cancel edit"
              accessibilityHint="Cancels editing mode and reverts changes"
            >
              <Icon name="close-outline" size={20} color="#E2E2B6" />
              <Text style={styles.editButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "column",
    backgroundColor: "#03346E",
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#021526",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
  },
  selectedTaskContainer: {
    backgroundColor: "#021526",
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  taskText: {
    flex: 1,
    fontSize: 25,
    color: "#E2E2B6",
    marginLeft: 10,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#6EACDA",
  },
  taskDate: {
    fontSize: 12,
    color: "#6EACDA",
    marginLeft: 34,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#6EACDA",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  deleteButton: {
    flexDirection: "row",
    backgroundColor: "#cd2028",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#E2E2B6",
    fontSize: 14,
    marginLeft: 5,
  },
  editButtonsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  confirmButton: {
    flexDirection: "row",
    backgroundColor: "#6EACDA",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 10,
  },
  cancelEditButton: {
    flexDirection: "row",
    backgroundColor: "#cd2028",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#E2E2B6",
    fontSize: 14,
    marginLeft: 5,
  },
  editInput: {
    fontSize: 18,
    color: "#E2E2B6",
    backgroundColor: "#6EACDA",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
});

export default TaskItem;
