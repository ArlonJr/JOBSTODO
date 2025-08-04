import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Note } from "../store/slices/notesSlice";
import NoteItem from "./NoteItem";

interface NotesListProps {
  notes: Note[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  const renderItem = ({ item }: { item: Note }) => <NoteItem note={item} />;

  return (
    <FlatList
      data={notes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  separator: {
    height: 12,
  },
});

export default NotesList;
