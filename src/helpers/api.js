import { API_URL } from '../config';
import { HTTP_METHODS } from '../constants/values';

const {
    DELETE,
    GET,
    POST,
    PUT,
} = HTTP_METHODS;

let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
};

const fetchURL = (url, { method = GET, body = {} } = {}) => {
    const content = { headers, method };

    if (method === POST || method === PUT) {
        content['body'] = JSON.stringify(body);
    }

    return fetch(url, content)
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

export const getPosts = () => {
    return fetchURL(`${API_URL}/posts`);
};

export const updatePostVote = (id, type) => {
    return fetchURL(`${API_URL}/posts/${id}`, { method: POST, body:{ option: type }});
};

export const setNewPost = (post = {}) => {
    return fetchURL(`${API_URL}/posts`, { method: POST, body:{ ...post }});
};

export const deleteComment = (id) => {
    return fetchURL(`${API_URL}/comments/${id}`, { method: DELETE });
};
