import {
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
    _getUsers,
    //TODO: user signup
} from './_DATA'


export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}


export function saveQuestion(question) {
    return _saveQuestion(question)
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}