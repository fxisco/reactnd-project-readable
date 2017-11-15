import { API_URL } from '../config';

let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

const fetchURL = (url) => {
    return fetch(url, { headers })
        .then(res => res.json())
        .then(data => data);
}

export const getCategories = () => {
    return fetchURL(`${API_URL}/categories`);
};

export const getCategoryPosts = (category) => {
    return fetchURL(`${API_URL}/${category}/posts`);
};

export const getPost = (id) => {
    return fetchURL(`${API_URL}/posts/${id}`);
};

export const getPostComments = (id) => {
    return fetchURL(`${API_URL}/posts/${id}/comments`);
};

