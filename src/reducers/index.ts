import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer'
import editorReducer from './editorReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  editor: editorReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;