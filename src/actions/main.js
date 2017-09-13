import { mainActions } from '../constants/actions';
import { getCategories } from '../helpers/api';

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
