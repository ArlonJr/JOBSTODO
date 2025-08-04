import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { logout } from "./store/slices/authSlice";
import { setSearchTerm, clearSearch } from "./store/slices/notesSlice";
import SearchBar from "./components/SearchBar";
import NotesList from "./components/NotesList";
import AddNoteModal from "./components/AddNoteModal";
import EmptyState from "./components/EmptyState";

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: any) => state.auth);
  const { notes, searchTerm } = useAppSelector((state: any) => state.notes);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          dispatch(clearSearch());
          router.push("/login");
        },
      },
    ]);
  };

  const handleSearch = (text: string) => {
    dispatch(setSearchTerm(text));
  };

  const filteredNotes = notes.filter(
    (note: any) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>JUST DO IT ALREADY</Text>
          <Text style={styles.subtitle}>Welcome, {user?.username}!</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color="#E2E2B6" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchTerm}
          onChangeText={handleSearch}
          placeholder="Search notes..."
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {notes.length === 0 ? (
          <EmptyState onAddNote={() => setIsModalVisible(true)} />
        ) : (
          <NotesList notes={filteredNotes} />
        )}
      </View>

      <AddNoteModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4e6190",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E2E2B6",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#E2E2B6",
    opacity: 0.8,
  },
  logoutButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    gap: 10,
  },
  addButton: {
    backgroundColor: "#6EACDA",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
