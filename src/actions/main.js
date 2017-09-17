import { mainActions } from '../constants/actions';
import { getCategories, getCategoryPosts } from '../helpers/api';

export const selectCategory = (categoryIndex) => {
    return {
        type: mainActions.SELECT_CATEGORY,
        categoryIndex
    };
};

export const fetchCategoriesSucces = (categories) => {
    return {
        type: mainActions.FETCH_CATEGORIES_SUCCESS,
        categories
    };
};

export const fetchCategories = () => {
    return (dispatch) => {
        getCategories()
            .then((categories) => {
                dispatch(fetchCategoriesSucces(categories));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const fetchCategoryPostsSucces = (posts) => {
    return {
        type: mainActions.FETCH_CATEGORY_POSTS_SUCCESS,
        posts
    }
};

export const fetchCategoryPosts = (category) => {
    return (dispatch) => {
        getCategoryPosts(category)
            .then((posts) => {
                const newPosts = posts.reduce((accumulator, post) => {
                    accumulator[post.id] = post;

                    return accumulator;
                }, {});

                dispatch(fetchCategoryPostsSucces(newPosts));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
