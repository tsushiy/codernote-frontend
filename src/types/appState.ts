export type AuthState = {
  isLoggedIn: boolean;
  name: string;
};

export type EditorState = {
  showPreview: boolean;
};

export type AppState = {
  auth: AuthState;
  editor: EditorState;
};