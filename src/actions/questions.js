export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function getQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

export function addAnswer(info) {
    return {
        type: SAVE_ANSWER,
        info
    }
}

