import { postActions } from '../constants/actions';
import {
    getPosts,
    setNewPost,
    updatePostVote
} from '../helpers/api';

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

export const updatePost = (id, data) => {
    return {
        type: postActions.UPDATE_POST_SUCCESS,
        id,
        data
    };
};

export const votePost = (id, type) => {
    return (dispatch) => {
        updatePostVote(id, type)
            .then((data) => {
                dispatch(updatePost(id, data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const addPost = (post) => {
    return {
        type: postActions.SUBMIT_POST_SUCCESS,
        post
    };
};

export const submitPost = (post) => {
    return (dispatch) => {
        setNewPost(post)
            .then((data) => {
                console.log('::data', data);
                dispatch(addPost(post));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

