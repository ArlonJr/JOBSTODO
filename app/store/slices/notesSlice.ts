import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  dateModified: string;
}

interface NotesState {
  notes: Note[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  searchTerm: "",
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (
      state,
      action: PayloadAction<Omit<Note, "id" | "dateCreated" | "dateModified">>
    ) => {
      const newNote: Note = {
        ...action.payload,
        id: Date.now().toString(),
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
      };
      state.notes.unshift(newNote);
    },
    updateNote: (
      state,
      action: PayloadAction<{ id: string; title: string; description: string }>
    ) => {
      const { id, title, description } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = {
          ...state.notes[noteIndex],
          title,
          description,
          dateModified: new Date().toISOString(),
        };
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = "";
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addNote,
  updateNote,
  deleteNote,
  setSearchTerm,
  clearSearch,
  setLoading,
  setError,
  clearError,
} = notesSlice.actions;

export default notesSlice.reducer;
