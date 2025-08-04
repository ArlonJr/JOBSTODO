import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface EmptyStateProps {
  onAddNote: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddNote }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="document-text-outline" size={80} color="#E2E2B6" />
      </View>

      <Text style={styles.title}>No notes yet</Text>
      <Text style={styles.subtitle}>
        Start creating your first note to get organized
      </Text>

      <TouchableOpacity style={styles.addButton} onPress={onAddNote}>
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Create Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 24,
    opacity: 0.7,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#E2E2B6",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#E2E2B6",
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  addButton: {
    backgroundColor: "#6EACDA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default EmptyState;
