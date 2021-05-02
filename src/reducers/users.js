import {
    GET_USERS,
  	SAVE_USER_QUESTION,
    SAVE_USER_ANSWER
} from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }
        
      	case SAVE_USER_QUESTION:
        	return {
              ...state,
              [action.author]: {
              	...state[action.author],
              questions: state[action.author].questions.concat(action.id)
              }
    		}
  
        case SAVE_USER_ANSWER:
            const { info } = action
            return {
                ...state,
                [info.authedUser]: {
                    ...state[info.authedUser],
                    answers: {
                        ...state[info.authedUser].answers,
                        [info.qid]: info.answer
                    }
                }
            }
        default:
            return state;
    }
}