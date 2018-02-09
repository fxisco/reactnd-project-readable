import { postActions } from '../constants/actions';
import { UP_VOTE } from '../constants/values';

const initialState = {
    posts: []
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

        default:
            return state;
    }
};

export default posts;
