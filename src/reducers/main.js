import {
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORY_POSTS_SUCCESS,
    RESET_LOADING_TEXT,
    SELECT_CATEGORY,
    SET_LOADING_TEXT,
} from '../actions/types';
import { UNDEFINED_CATEGORY, CATEGORY_ALL } from '../constants/values';

const initialState = {
    categories: [CATEGORY_ALL],
    selectedCategoryIndex: UNDEFINED_CATEGORY,
    posts: {},
    loadingText: 'Loading',
};

const main = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS: {
            return {
                ...state,
                categories: [
                    ...initialState.categories,
                    ...action.categories
                ],
                selectedCategoryIndex: 0
            };
        }

        case SELECT_CATEGORY: {
            return {
                ...state,
                selectedCategoryIndex: action.categoryIndex
            }
        }

        case FETCH_CATEGORY_POSTS_SUCCESS: {
            return {
                ...state,
                posts: {
                    ...state.posts,
                    ...action.posts
                }
            }
        }

        case SET_LOADING_TEXT: {
            return {
                ...state,
                loadingText: action.text
            };
        }

        case RESET_LOADING_TEXT: {
            return {
                ...state,
                loadingText: initialState.loadingText
            };
        }

        default:
            return state;
    }
};

export default main;
