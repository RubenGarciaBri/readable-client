import { TRIGGER_NOTIFICATION } from '../actions/notifications'

export default function notifications (state = [], action) {
  switch(action.type) {
    case TRIGGER_NOTIFICATION:  
    
      return [
        ...state,
        action.payload.notification
      ]

      default :
      return state
  }
}