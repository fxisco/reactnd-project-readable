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
                ],
                postsDetails: {
                    ...state.postsDetails,
                    [action.data.id]: {
                        ...action.data
                    }
                }
            };
        }

        case postActions.FETCH_POST_COMMENTS_SUCCESS: {
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

        case postActions.FETCH_POST_SUCCESS: {
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

        case postActions.DELETE_POST_COMMENT_SUCCESS: {
            const postsComments = { ...state.postsComments[action.postId] };

            delete postsComments[action.commentId];

            return {
                ...state,
                postsComments: {
                    ...state.postsComments,
                    [action.postId]: {
                        ...postsComments
                    }
                }
            };
        }

        case postActions.POST_COMMENT_SUCCESS: {
            return {
                ...state,
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

        case postActions.POST_COMMENT_EDIT_SUCCESS: {
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
