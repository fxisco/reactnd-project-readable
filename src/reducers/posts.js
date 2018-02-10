import { postActions } from '../constants/actions';

const initialState = {
    posts: [],
    postsComments: {},
    postsDetails: {}
};

const posts = (state = initialState, action) => {
    switch (action.type) {
        case postActions.FETCH_POSTS_SUCCESS: {
            return {
                ...state,
                posts: action.posts,
            };
        }
        case postActions.SUBMIT_POST_SUCCESS: {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    action.post
                ]
            };
        }
        case postActions.UPDATE_POST_SUCCESS: {
            const index = state.posts.findIndex(item => item.id === action.id);

            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, index),
                    action.data,
                    ...state.posts.slice(index + 1)
                ]
            };
        }

        case postActions.FETCH_POST_COMMENTS_SUCCESS: {
            return {
                ...state,
                postsComments: {
                    ...state.postsComments,
                    [action.id]: {
                        ...action.comments
                    }
                }
            };
        }

        case postActions.FETCH_POST_SUCCESS: {
            return {
                ...state,
                postsDetails: {
                    ...state.posts,
                    [action.post.id]: {
                        ...action.post
                    }
                }
            };
        }

        case postActions.DELETE_POST_SUCCESS: {
            return {
                ...state,
                postsDetails: {
                    ...state.postsDetails,
                    [action.id] : {
                        ...state.postsDetails[action.id],
                        deleted: true
                    }
                }
            };
        }

        default:
            return state;
    }
};

export default posts;
