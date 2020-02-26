import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import editorReducer from './editorReducer'
import contestReducer from './contestReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  editor: editorReducer,
  contest: contestReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer