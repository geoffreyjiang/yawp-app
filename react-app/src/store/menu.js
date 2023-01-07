const LOAD_MENU = "/biz/LOAD_MENU";
const ADD_TO_MENU = "/biz/ADD_TO_MENU";

const loadMenu = (menu) => ({
    type: LOAD_MENU,
    menu,
});

const addMenu = (menu) => ({
    type: ADD_TO_MENU,
    menu,
});

export const getMenu = (id) => async (dispatch) => {
    const response = await fetch(`/api/biz/${id}/menu`);
    if (response.ok) {
        const menu = await response.json();
        dispatch(loadMenu(menu));
    }
};

export const addMenuItem = (id, item) => async (dispatch) => {
    const response = await fetch(`/api/biz/${id}/menu`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    if (response.ok) {
        const menu = await response.json();
        dispatch(addMenu(menu));
    }
};

const menuReducer = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case LOAD_MENU:
            return action.menu;
        case ADD_TO_MENU:
            newState[action.menu.id] = action.menu;
            return newState;
        default:
            return state;
    }
};

export default menuReducer;
