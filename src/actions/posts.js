import { postActions } from '../constants/actions';
import { getPosts } from '../helpers/api';

export const fetchPostsSuccess = (posts) => {
    return {
        type: postActions.FETCH_POSTS_SUCCESS,
        posts
    };
};

export const fetchPosts = () => {
    return (dispatch) => {
        getPosts()
            .then((posts) => {
                dispatch(fetchPostsSuccess(posts));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
