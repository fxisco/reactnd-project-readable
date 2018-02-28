import { mainActions } from '../constants/actions';
import { UNDEFINED_CATEGORY, CATEGORY_ALL } from '../constants/values';

const initialState = {
    categories: [CATEGORY_ALL],
    selectedCategoryIndex: UNDEFINED_CATEGORY,
    posts: {},
    loadingText: 'Loading',
};

const main = (state = initialState, action) => {
    switch (action.type) {
        case mainActions.FETCH_CATEGORIES_SUCCESS: {
            return {
                ...state,
                categories: [
                    ...initialState.categories,
                    ...action.categories
                ],
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

        case mainActions.SET_LOADING_TEXT: {
            return {
                ...state,
                loadingText: action.text
            };
        }

        case mainActions.RESET_LOADING_TEXT: {
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
