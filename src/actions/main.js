import {
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORY_POSTS_SUCCESS,
    RESET_LOADING_TEXT,
    SELECT_CATEGORY,
    SET_LOADING_TEXT,
} from '../actions/types';
import {
    getCategories,
    getCategoryPosts,
} from '../helpers/api';

export const selectCategory = (categoryIndex) => {
    return {
        type: SELECT_CATEGORY,
        categoryIndex
    };
};

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
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
        type: FETCH_CATEGORY_POSTS_SUCCESS,
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

export const setLoadingText = (text) => {
    return {
        type: SET_LOADING_TEXT,
        text
    };
};

export const resetLoadingText = () => {
    return {
        type: RESET_LOADING_TEXT,
    };
};
