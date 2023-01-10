const GET_QUESTIONS = "biz/GET_QUESTIONS";
const GET_MY_QUESTION = "biz/GET_MY_QUESTION";
const ASK_QUESTION = "biz/ASK_QUESTION";
const EDIT_QUESTION = "biz/EDIT_QUESTION";
const DELETE_QUESTION = "biz/DELETE_QUESTION";

const loadQuestions = (question) => ({
    type: GET_QUESTIONS,
    question,
});

const addQuestion = (question) => ({
    type: ASK_QUESTION,
    question,
});

const updateQuestion = (question) => ({
    type: EDIT_QUESTION,
    question,
});

const removeQuestion = (questionId) => ({
    type: DELETE_QUESTION,
    questionId,
});

export const getQuestions = (id) => async (dispatch) => {
    const response = await fetch(`/api/biz/${id}/questions`);
    if (response.ok) {
        const questions = await response.json();
        dispatch(loadQuestions(questions));
    }
};

// export const getMyQuestion = () => async (dispatch) => {
//     const response = await csrfFetch(`/api/questions/current`)
//     if (response.ok) {
//         const questions = await response.json()
//         dispatch(loadQuestions(questions))
//     }
// }

export const postQuestion = (bizId, qData) => async (dispatch) => {
    console.log("QUESTION THUNK", bizId);
    console.log("QUESTION THUNK", qData);

    const response = await fetch(`/api/biz/${bizId}/questions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(qData),
    });
    if (response.ok) {
        const question = await response.json();
        dispatch(addQuestion(question));
    }
};

export const editQuestion = (qData) => async (dispatch) => {
    const response = await fetch(`/api/questions/${qData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(qData),
    });
    if (response.ok) {
        const question = await response.json();
        dispatch(updateQuestion(question));
    }
};

export const deleteQuestion = (qData) => async (dispatch) => {
    const response = await fetch(`/api/questions/${qData.id}`, {
        method: "DELETE",
    });
    await response.json();
    dispatch(removeQuestion(qData.id));
};

export default function questionReducer(state = {}, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_QUESTIONS:
            return action.question;
        case ASK_QUESTION:
            newState[action.question.id] = action.question;
            return newState;
        case EDIT_QUESTION:
            newState[action.question.id] = action.question;
            return newState;
        // case GET_MY_QUESTION:
        //     return action.question
        case DELETE_QUESTION:
            delete newState[action.questionId];
            return newState;
        default:
            return state;
    }
}
