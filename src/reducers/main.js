import { mainActions } from '../constants/actions';
import { UNDEFINED_CATEGORY } from '../constants/values';

const initialState = {
    categories: [],
    selectedCategoryIndex: UNDEFINED_CATEGORY,
    posts: {}
};

const main = (state = initialState, action) => {
    switch (action.type) {
        case mainActions.FETCH_CATEGORIES_SUCCESS: {
            return {
                ...state,
                categories: action.categories,
                selectedCategoryIndex: 0
            };
        }
        case mainActions.SELECT_CATEGORY: {
            return {
                ...state,
                selectedCategoryIndex: action.categoryIndex
            }
        }
        case mainActions.FETCH_CATEGORY_POSTS_SUCCESS: {
            return {
                ...state,
                posts: {
                    ...state.posts,
                    ...action.posts
                }
            }
        }
        default:
            return state;
    }
};

export default main;
