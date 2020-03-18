export const settingMessage = (msg) => {
  return {
    type: 'new message',
    data: msg
  }
}

const NotificationReducer = (state = null, action) => {

  switch(action.type) {
  case 'new message':
    return action.data
  default:
    return state
  }
}

export default NotificationReducer