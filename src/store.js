import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import BlogReducer from './reducers/BlogReducer'
import UserReducer from './reducers/UserReducer'
import NotificationReducer from './reducers/NotificationReducer'
import NotificationTypeReducer from './reducers/NotificationTypeReducer'


const reducer = combineReducers({
  blogs: BlogReducer,
  user: UserReducer,
  message: NotificationReducer,
  typeMessage: NotificationTypeReducer

})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store