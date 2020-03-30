import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer'
import problemReducer from './problemReducer'
import editorReducer from './editorReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  problem: problemReducer,
  editor: editorReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;