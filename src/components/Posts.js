import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DEFAULT_DATE_FORMAT } from '../constants/values';
import Post from './Post';

const Posts = ({ onClick, category, posts = [] }) => {
    return (
        <div className="container">
            {Object.keys(posts)
                .filter((id) => {
                    const post = posts[id];

                    return post.category === category;
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
