export const GET_USERS = 'GET_USERS'
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'

export function getUsers(users) {
    return {
        type: GET_USERS,
        users
    }
}

export function addUserQuestion(id, author) {
  return {
    type: SAVE_USER_QUESTION,
    id,
    author
  }
}

export function addUserAnswer(info) {
    return {
        type: SAVE_USER_ANSWER,
        info
    }
}

