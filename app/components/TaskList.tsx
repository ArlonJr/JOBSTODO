import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  dateAdded: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
  onUpdateTask: (id: string, newText: string) => void;
  onDeleteTask: (id: string) => void;
  selectedTaskIds: Set<string>;
  toggleTaskSelection: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleCompletion,
  onUpdateTask,
  onDeleteTask,
  selectedTaskIds,
  toggleTaskSelection,
}) => {
  if (tasks.length === 0) {
    return <Text style={styles.noTasksText}>No tasks added yet.</Text>;
  }

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          onToggleCompletion={onToggleCompletion}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          isSelected={selectedTaskIds.has(item.id)}
          onSelect={toggleTaskSelection}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  noTasksText: {
    color: "#E2E2B6",
    fontSize: 22,
    textAlign: "center",
    marginTop: 50,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default TaskList;
