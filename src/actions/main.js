import { mainActions } from '../constants/actions';
import { getCategories, getCategoryPosts, getPost, getPostComments } from '../helpers/api';

export const selectCategory = (categoryIndex) => {
    return {
        type: mainActions.SELECT_CATEGORY,
        categoryIndex
    };
};

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: mainActions.FETCH_CATEGORIES_SUCCESS,
        categories
    };
};

export const fetchCategories = () => {
    return (dispatch) => {
        getCategories()
            .then((data) => {
                dispatch(fetchCategoriesSuccess(data.categories));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const fetchCategoryPostsSuccess = (posts) => {
    return {
        type: mainActions.FETCH_CATEGORY_POSTS_SUCCESS,
        posts
    };
};

export const fetchCategoryPosts = (category) => {
    return (dispatch) => {
        getCategoryPosts(category)
            .then((posts) => {
                const newPosts = posts.reduce((accumulator, post) => {
                    accumulator[post.id] = post;

                    return accumulator;
                }, {});

                dispatch(fetchCategoryPostsSuccess(newPosts));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const fetchPostSuccess = (post) => {
    return {
        type: mainActions.FETCH_POST_SUCCESS,
        post
    };
};

export const fetchPost = (id) => {
    return (dispatch) => {
        getPost(id)
            .then((post) => {
                console.log('::post', post);
                dispatch(fetchPostSuccess(post));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const fetchPostCommentsSuccess = (id, comments) => {
    return {
        type: mainActions.FETCH_POST_COMMENTS_SUCCESS,
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

export const setLoadingText = (text) => {
    return {
        type: mainActions.SET_LOADING_TEXT,
        text
    };
};

export const resetLoadingText = () => {
    return {
        type: mainActions.RESET_LOADING_TEXT,
    };
};
