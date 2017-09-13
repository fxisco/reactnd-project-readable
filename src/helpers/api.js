import { API_URL } from '../config';

let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

export const getCategories = () => {
    return fetch(`${API_URL}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories);
};

export const getPosts = () => {
    return fetch(`${API_URL}/posts`, { headers })
        .then(res => res.json())
        .then(data => data);
};
