import { postActions } from '../constants/actions';
import {
    deleteComment,
    getPost,
    getPosts,
    getPostComments,
    putPost,
    setNewPost,
    updatePostVote,
    updateCommentVote,
    removePost,
    saveComment,
    submitComment,
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

export const savePost = (id, data) => {
    return (dispatch) => {
        putPost(id, data)
            .then((data) => {
                dispatch(updatePost(id, data));
            })
            .catch((error) => {
                console.log(error);
            });
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

export const voteComment = (id, type) => {
    return (dispatch) => {
        updateCommentVote(id, type)
            .then((data) => {
                dispatch(postCommentEditSuccess(data));
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
                dispatch(addPost(post));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const fetchPostCommentsSuccess = (id, comments) => {
    return {
        type: postActions.FETCH_POST_COMMENTS_SUCCESS,
        comments,
        id
    };
};

export const fetchPostComments = (id) => {
    return (dispatch) => {
        getPostComments(id)
            .then((comments) => {
                dispatch(fetchPostCommentsSuccess(id, comments));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const fetchPostSuccess = (id, post) => {
    return {
        type: postActions.FETCH_POST_SUCCESS,
        id,
        post
    };
};

export const fetchPost = (id) => {
    return (dispatch) => {
        getPost(id)
            .then((post) => {
                if (post.deleted !== undefined && !post.deleted) {
                    dispatch(fetchPostSuccess(id, post));
                } else {
                    dispatch(fetchPostSuccess(id, { deleted: true }));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const deletePost = (postId) => {
    return (dispatch) => {
        removePost(postId)
            .then((post) => {
                dispatch(updatePost(postId, post));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const deletePostCommentSuccess = (postId, commentId) => {
    return {
        type: postActions.DELETE_POST_COMMENT_SUCCESS,
        postId,
        commentId
    };
};

export const deletePostComment = (postId, commentId) => {
    return (dispatch) => {
        deleteComment(commentId)
            .then((comment) => {
                dispatch(deletePostCommentSuccess(postId, comment.id));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const postCommentSuccess = (comment) => {
    return {
        type: postActions.POST_COMMENT_SUCCESS,
        comment
    };
};

export const postComment = (comment) => {
    return (dispatch) => {
        submitComment(comment)
            .then((data) => {
                dispatch(postCommentSuccess(data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const postCommentEditSuccess = (comment) => {
    return {
        type: postActions.POST_COMMENT_EDIT_SUCCESS,
        comment
    };
};

export const postCommentEdit = (id, update) => {
    return (dispatch) => {
        saveComment(id, update)
            .then((data) => {
                dispatch(postCommentEditSuccess(data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
