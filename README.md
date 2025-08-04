# Notes App - React Native

A simple note-taking application built with Expo, React Navigation, and Redux Toolkit with redux-persist for the Junior React Native Developer position.

To download the APK : https://expo.dev/accounts/arlonjr/projects/JOBSTODO/builds/966dcf3a-c828-42f5-9cd1-1161c691edd7

## 🚀 Features

### Authentication

- **Login Screen** with form validation
- **Mock Credentials**: Username: `test`, Password: `password123`
- **Persistent Login**: Session persists after app restart
- **Logout Functionality** with confirmation dialog

### Notes Management

- **Create Notes**: Add new notes with title and description
- **Edit Notes**: Modify existing notes with inline editing
- **Delete Notes**: Remove notes with confirmation dialog
- **Search Notes**: Filter notes by title or description
- **Empty State**: Beautiful UI when no notes exist

### Technical Features

- **Redux Toolkit**: State management with slices
- **Redux Persist**: Data persistence across app sessions
- **React Navigation**: Screen navigation and routing
- **TypeScript**: Full type safety
- **Modern UI/UX**: Clean, responsive design

## 📱 Screenshots

### Login Screen

- Clean login form with validation
- Demo credentials displayed
- Loading states and error handling

### Home Dashboard

- Search bar for filtering notes
- Notes list with edit/delete actions
- Add note button and modal
- Logout functionality
- Empty state when no notes exist

## 🛠️ Tech Stack

- **Expo**: React Native development platform
- **React Navigation**: Navigation library
- **Redux Toolkit**: State management
- **Redux Persist**: Data persistence
- **TypeScript**: Type safety
- **React Native Vector Icons**: Icon library

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd JOBSTODO
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go app on your phone

## 🔧 Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── AddNoteModal.tsx
│   ├── EmptyState.tsx
│   ├── NoteItem.tsx
│   ├── NotesList.tsx
│   └── SearchBar.tsx
├── services/            # Business logic services
│   └── authService.ts
├── store/               # Redux store configuration
│   ├── hooks.ts
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       └── notesSlice.ts
├── _layout.tsx          # Root layout with Redux Provider
├── index.tsx            # Main entry point with auth routing
├── login.tsx            # Login screen route
└── home.tsx             # Home dashboard route
```

## 🎯 Key Implementation Details

### Redux Store Structure

- **Auth Slice**: Handles authentication state
- **Notes Slice**: Manages notes CRUD operations
- **Redux Persist**: Persists auth and notes data

### Navigation Flow

- **index.tsx**: Determines initial route based on auth state
- **login.tsx**: Authentication interface
- **home.tsx**: Main notes dashboard

### State Management

- **Authentication**: Login/logout with persistent sessions
- **Notes**: Create, read, update, delete operations
- **Search**: Real-time filtering of notes

## 🧪 Testing

### Manual Testing Checklist

- [✅ ] Login with correct credentials
- [✅ ] Login with incorrect credentials
- [✅ ] Login with empty fields
- [✅ ] Create new note
- [✅ ] Edit existing note
- [✅ ] Delete note
- [✅ ] Search notes
- [✅ ] Logout functionality
- [✅ ] App restart persistence
- [✅ ] Empty state display

## 📋 Requirements Fulfillment

### ✅ Functional Requirements

- [x] Login screen with mock credentials
- [x] Form validation (empty fields, invalid credentials)
- [x] Persistent login after app restart
- [x] Home dashboard with notes list
- [x] Search bar for filtering notes
- [x] Note items with edit/delete options
- [x] Add note modal with cancel/confirm buttons
- [x] Empty state UI
- [x] Logout button

### ✅ Technical Requirements

- [x] Expo for development
- [x] React Navigation for screen transitions
- [x] Redux Toolkit for state management
- [x] Redux Persist for data persistence
- [x] Well-structured, modular code
- [x] Clean and user-friendly UI/UX

Created by Arlon Jr. T. Ylasco.
