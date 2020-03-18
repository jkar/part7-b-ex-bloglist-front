export const settingTypeNotification = (t) => {
  return {
    type: 'set type',
    data: t
  }
}

const NotificationTypeReducer = (state = 'bad', action) => {
  switch(action.type) {
  case 'set type':
    return action.data
  default:
    return state
  }
}

export default NotificationTypeReducer