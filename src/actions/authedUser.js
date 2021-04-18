export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(id, avatar) {
  return {
    type: SET_AUTHED_USER,
    payload: {
      id,
      avatar
    }
  }
}
