import { mainActions } from '../constants/actions';
import { UNDEFINED_CATEGORY } from '../constants/values';

const initialState = {
    categories: [],
    selectedCategoryIndex: UNDEFINED_CATEGORY,
    posts: {},
    loadingText: 'Loading',
    postsDetail: {}
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

        case mainActions.FETCH_POST_SUCCESS: {
            return {
                ...state,
                postsDetail: {
                    [action.post.id]: {
                        ...action.post
                    }
                }
            };
        }

        case mainActions.FETCH_POST_COMMENTS_SUCCESS: {
            return {
                ...state,
                postsComments: {
                    [action.id]: {
                        ...action.comments
                    }
                }
            };
        }

        default:
            return state;
    }
};

export default main;
