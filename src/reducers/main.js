import { mainActions } from '../constants/actions';

const initialState = {
    categories: [],
    selectedCategoryIndex: 0
};

const main = (state = initialState, action) => {
    switch (action.type) {
        case mainActions.FETCH_CATEGORIES_SUCCESS: {
            return {
                ...state,
                categories: action.categories
            };
        }
        case mainActions.SELECT_CATEGORY: {
            return {
                ...state,
                selectedCategoryIndex: action.categoryIndex
            }
        }
        default:
            return state;
    }
};

export default main;
