import React from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface AddTaskModalProps {
  isVisible: boolean;
  newTask: string;
  setNewTask: (text: string) => void;
  onAddTask: () => void;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isVisible,
  newTask,
  setNewTask,
  onAddTask,
  onClose,
}) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalInput}
            placeholder="Add a new task"
            placeholderTextColor="#E2E2B6"
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={onAddTask}
            returnKeyType="done"
            accessibilityLabel="New task input"
            accessibilityHint="Enter the text for the new task"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              accessibilityLabel="Cancel adding task"
              accessibilityHint="Closes the add task modal without adding a task"
            >
              <Icon name="close-circle-outline" size={24} color="#021526" />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addModalButton}
              onPress={onAddTask}
              accessibilityLabel="Add task"
              accessibilityHint="Adds the new task to the list"
            >
              <Icon name="checkmark-circle-outline" size={24} color="#021526" />
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(2, 21, 38, 0.8)",
  },
  modalContainer: {
    backgroundColor: "#021526",
    padding: 20,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
    shadowColor: "#03346E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  modalInput: {
    fontSize: 18,
    color: "#E2E2B6",
    backgroundColor: "#03346E",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  addModalButton: {
    backgroundColor: "#6EACDA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#cd2028",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonText: {
    color: "#021526",
    fontSize: 16,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: "#021526",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default AddTaskModal;
