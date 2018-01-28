import { postActions } from '../constants/actions';


const initialState = {
    posts: {}
};

const posts = (state = initialState, action) => {
    switch (action.type) {
        case postActions.FETCH_POSTS_SUCCESS: {
            return {
                ...state,
                posts: action.posts,
            };
        }

        default:
            return state;
    }
};

export default posts;
