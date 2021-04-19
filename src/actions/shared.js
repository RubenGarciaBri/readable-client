import { getInitialData } from '../utils/api'
import { setAuthedUser } from './authedUser'
import { receiveUsers } from './users'
import { receivePosts } from './posts'

const AUTHED_ID = 'Carol'
const AUTHED_AVATAR = 'https://randomuser.me/api/portraits/women/2.jpg'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
    .then(data => {
      console.log(data)
    })
  //   .then(({ users, posts }) => {
  //   // Default user log in for development purposes 
  //   dispatch(setAuthedUser(AUTHED_ID, AUTHED_AVATAR))
  //   dispatch(receiveUsers(users))
  //   dispatch(receivePosts(posts)) 
  // })
  }
}