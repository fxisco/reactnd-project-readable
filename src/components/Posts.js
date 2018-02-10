import React from 'react';
import {
    DOWN_VOTE,
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
