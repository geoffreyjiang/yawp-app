const LOAD_BUSINESSES = 'biz/LOAD_BUSINESSES'
const GET_MY_BUSINESS = 'biz/GET_MY_BUSINESS'
const ADD_BUSINESS = 'biz/ADD_BUSINESS'
const UPDATE_BUSINESS = 'biz/UPDATE_BUSINESS'
const DELETE_BUSINESS = 'biz/DELETE_BUSINESS'
const GET_BUSINESS_BY_ID = 'biz/GET_BUSINESS_BY_ID'

const loadBusinesses = (biz) => ({
    type: LOAD_BUSINESSES,
    payload: biz
})

const addBusiness = (biz) => ({
    type: ADD_BUSINESS,
    payload: biz
})

const updateBusiness = (biz) => ({
    type: UPDATE_BUSINESS,
    payload: biz
})

const deleteBusiness = (bizId) => ({
    type: DELETE_BUSINESS,
    payload: bizId
})

export default function reducer(state = {}, action) {
    switch (action.type) {

    }
}
