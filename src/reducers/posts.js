import {
    DELETE_POST_SUCCESS,
    DELETE_POST_COMMENT_SUCCESS,
    FETCH_POST_SUCCESS,
    FETCH_POST_COMMENTS_SUCCESS,
    FETCH_POSTS_SUCCESS,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_EDIT_SUCCESS,
    SUBMIT_POST_SUCCESS,
    UPDATE_POST_SUCCESS,
} from '../actions/types';

const initialState = {
    posts: [],
    postsComments: {},
    postsDetails: {}
};

const posts = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS: {
            return {
                ...state,
                posts: action.posts,
            };
        }
        case SUBMIT_POST_SUCCESS: {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    action.post
                ]
            };
        }
        case UPDATE_POST_SUCCESS: {
            const index = state.posts.findIndex(item => item.id === action.id);

            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, index),
                    {
                        ...state.posts[index],
                        ...action.data
                    },
                    ...state.posts.slice(index + 1)
                ],
                postsDetails: {
                    ...state.postsDetails,
                    [action.data.id]: {
                        ...state.posts[index],
                        ...action.data
                    }
                }
            };
        }

        case FETCH_POST_COMMENTS_SUCCESS: {
            return {
                ...state,
                postsComments: {
                    ...state.postsComments,
                    [action.id]: {
                        ...action.comments.reduce((accum, item) => {
                            accum[item.id] = item;

                            return accum;
                        }, {})
                    }
                }
            };
        }

        case FETCH_POST_SUCCESS: {
            return {
                ...state,
                postsDetails: {
                    ...state.postsDetails,
                    [action.id]: {
                        ...action.post
                    }
                }
            };
        }

        case DELETE_POST_SUCCESS: {
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

        case DELETE_POST_COMMENT_SUCCESS: {
            const postsComments = { ...state.postsComments[action.postId] };
            const postId = postsComments[action.commentId].parentId;
            const index = state.posts.findIndex(item => item.id === postId);

            delete postsComments[action.commentId];

            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, index),
                    {
                        ...state.posts[index],
                        commentCount: state.posts[index].commentCount - 1
                    },
                    ...state.posts.slice(index + 1)
                ],
                postsDetails: {
                    ...state.postsDetails,
                    [postId]: {
                        ...state.posts[index],
                        commentCount: state.posts[index].commentCount - 1
                    }
                },
                postsComments: {
                    ...state.postsComments,
                    [action.postId]: {
                        ...postsComments
                    }
                }
            };
        }

        case POST_COMMENT_SUCCESS: {
            const index = state.posts.findIndex(item => item.id === action.comment.parentId);

            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, index),
                    {
                        ...state.posts[index],
                        commentCount: state.posts[index].commentCount + 1
                    },
                    ...state.posts.slice(index + 1)
                ],
                postsDetails: {
                    ...state.postsDetails,
                    [action.comment.parentId]: {
                        ...state.posts[index],
                        commentCount: state.posts[index].commentCount + 1
                    }
                },
                postsComments: {
                    ...state.postsComments,
                    [action.comment.parentId] : {
                        ...state.postsComments[action.comment.parentId],
                        [action.comment.id]: {
                            ...action.comment
                        }
                    }
                }
            };
        }

        case POST_COMMENT_EDIT_SUCCESS: {
            return {
                ...state,
                postsComments: {
                    ...state.postsComments,
                    [action.comment.parentId] : {
                        ...state.postsComments[action.comment.parentId],
                        [action.comment.id]: {
                            ...action.comment
                        },
                    }
                }
            };
        }

        default:
            return state;
    }
};

export default posts;
