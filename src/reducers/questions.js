import {
    GET_QUESTIONS,
    SAVE_QUESTION,
    SAVE_ANSWER
} from '../actions/questions'


export default function questions(state = {}, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }

        case SAVE_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }

        case SAVE_ANSWER:
            const { info } = action
            return {
                ...state,
                [info.qid]: {
                    ...state[info.qid],
                    [info.answer]: {
                        ...state[info.qid][info.answer],
                        votes: state[info.qid][info.answer].votes.concat([info.authedUser])
                    }
                }
            }

        default:
            return state;
    }
}
