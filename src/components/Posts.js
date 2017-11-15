import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DEFAULT_DATE_FORMAT } from '../constants/values';
import Post from './Post';

const Posts = ({ onClick, posts = [] }) => {
    return (
        <div className="container">
            {Object.keys(posts).map((id) => {
                const post = posts[id];

                return (
                    <Post {...post} />
                );
            })}
        </div>
    );
};

export default Posts;
