const LOAD_BUSINESSES = "biz/LOAD_BUSINESSES";
const GET_MY_BUSINESS = "biz/GET_MY_BUSINESS";
const ADD_BUSINESS = "biz/ADD_BUSINESS";
const UPDATE_BUSINESS = "biz/UPDATE_BUSINESS";
const DELETE_BUSINESS = "biz/DELETE_BUSINESS";
const GET_BUSINESS_BY_ID = "biz/GET_BUSINESS_BY_ID";

const loadBusinesses = (biz) => ({
    type: LOAD_BUSINESSES,
    biz,
});

const loadBusinessbyId = (biz) => ({
    type: GET_BUSINESS_BY_ID,
    biz,
});

const loadMyBusiness = (biz) => ({
    type: GET_MY_BUSINESS,
    biz,
});

const addBusiness = (biz) => ({
    type: ADD_BUSINESS,
    biz,
});

const updateBusiness = (biz) => ({
    type: UPDATE_BUSINESS,
    biz,
});

const deleteBusiness = (bizId) => ({
    type: DELETE_BUSINESS,
    bizId,
});

export const getBusinesses = () => async (dispatch) => {
    const response = await csrfFetch("/api/biz");
    if (response.ok) {
        const biz = await response.json();
        dispatch(loadBusinesses(biz));
    }
};

export const getBusinessId = (bizId) => async (dispatch) => {
    const response = await csrfFetch(`/api/biz/${bizId}`);
    if (response.ok) {
        const biz = await response.json();
        dispatch(loadBusinessbyId(biz));
    }
};

export const getMyBusiness = () => async (dispatch) => {
    const response = await csrfFetch(`/api/biz/current`);
    if (response.ok) {
        const biz = await response.json();
        dispatch(loadMyBusiness(biz));
    }
};

export const createBusiness = (bizData) => async (dispatch) => {
    const response = await csrfFetch("/api/biz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bizData),
    });

    if (response.ok) {
        const biz = await response.json();
        dispatch(addBusiness(biz));
    }
};

export const editBusiness = (bizData) => async (dispatch) => {
    const response = await csrfFetch(`/api/biz/${bizData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bizData),
    });
    if (response.ok) {
        const biz = await response.json();
        dispatch(updateBusiness(biz));
    }
};

export const removeBusiness = (bizData) => async (dispatch) => {
    const response = await csrfFetch(`/api/biz/${bizData.id}`, {
        method: "DELETE",
    });
    await response.json();
    dispatch(deleteBusiness(bizData.id));
};

export default function reducer(state = {}, action) {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_BUSINESSES:
            return action.biz;
        case GET_BUSINESS_BY_ID:
            return action.biz;
        case GET_MY_BUSINESS:
            return action.biz;
        case ADD_BUSINESS:
            newState[action.biz.id] = action.biz;
            return newState;
        case UPDATE_BUSINESS:
            newState[action.biz.id] = action.biz;
            return newState;
        case DELETE_BUSINESS:
            delete newState[action.bizId];
            return newState;
    }
}
