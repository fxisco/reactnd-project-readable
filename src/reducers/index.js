import { combineReducers } from 'redux';
import main from './main';
import posts from './posts';

export default combineReducers({
    main,
    posts
});
