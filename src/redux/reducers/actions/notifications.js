import { generateId } from '../utils/helpers'

export const TRIGGER_NOTIFICATION = 'TRIGGER_NOTIFICATION'

function triggerNotification (notification) {
  return {
    type: TRIGGER_NOTIFICATION,
    payload: {
      notification
    }
  }
}

export function handleTriggerNotification (type, title, message) {
  return (dispatch) => {
    dispatch(triggerNotification({
      id: generateId(),
      title,
      type: type.toUpperCase(), 
      message
    }))
  }
}