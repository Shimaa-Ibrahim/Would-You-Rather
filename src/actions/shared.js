import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
    getInitialData,
  	saveQuestion,
    saveQuestionAnswer
} from '../util/api'

import {
    getUsers,
  	addUserQuestion,
    addUserAnswer
} from './users'

import {
    getQuestions,
  	addQuestion,
    addAnswer
} from './questions'
//import {setAuthedUser} from './authedUser'

//const id = localStorage.getItem('userID');

export function recieveIntialData() {

    return (dispatch) => {
        dispatch(showLoading());
        getInitialData().then(({ users, questions }) => {
            dispatch(getUsers(users));
            dispatch(getQuestions(questions));
            //dispatch(setAuthedUser(id))
            dispatch(hideLoading());

        }).catch(err => console.log(err))
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        }).then(question => {
          dispatch(addQuestion(question))
          dispatch(addUserQuestion(question.id, question.author))
        })
            .then(() => dispatch(hideLoading()))
            .catch(err => console.warn(err))
    }
}

export function handleAddAnswer({ authedUser, qid, answer }) {
    return (dispatch) => {
        dispatch(showLoading())
        saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then(() => {
            dispatch(addAnswer({ authedUser, qid, answer }))
            dispatch(addUserAnswer({ authedUser, qid, answer }))
        })
            .then(() => dispatch(hideLoading()))
            .catch(err => console.warn('add answer err : ', err))
    }
}


