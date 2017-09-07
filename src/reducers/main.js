import { mainActions } from '../constants/actions';

const initialState = {
    categories: []
};

const main = (state = initialState, action) => {
    switch (action.type) {
        case mainActions.FETCH_CATEGORIES_SUCCESS: {
            return {
                ...state,
                categories: action.categories
            };
        }
        default:
            return state;
    }
};

export default main;
