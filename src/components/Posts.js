import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { CATEGORY_ALL, DEFAULT_DATE_FORMAT, UNDEFINED_CATEGORY } from '../constants/values';
import Post from './Post';

const Posts = ({ onClick, category, posts = [] }) => {
    return (
        <div className="container">
            {Object.keys(posts)
                .filter((id) => {
                    const post = posts[id];

                    return !category || post.category === category;
                })
                .map((id) => {
                const post = posts[id];

                return (
                    <Post key={`post-${id}`} {...post} />
                );
            })}
        </div>
    );
};

export default Posts;
