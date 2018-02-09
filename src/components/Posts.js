import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
    CATEGORY_ALL,
    DEFAULT_DATE_FORMAT,
    DOWN_VOTE,
    UNDEFINED_CATEGORY,
    UP_VOTE,
} from '../constants/values';
import Post from './Post';

const Posts = ({
    category,
    onClick,
    onVote,
    posts = []
}) => {
    return (
        <div>
            {Object.keys(posts)
                .filter((id) => {
                    const post = posts[id];

                    return !category || post.category === category;
                })
                .map((id) => {
                const post = posts[id];

                return (
                    <Post
                        key={`post-${id}`}
                        onVoteDown={onVote.bind(null, post.id, DOWN_VOTE)}
                        onVoteUp={onVote.bind(null, post.id, UP_VOTE)}
                        {...post}
                    />
                );
            })}
        </div>
    );
};

export default Posts;
