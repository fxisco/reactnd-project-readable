import React from 'react';
import {
    DOWN_VOTE,
    UP_VOTE,
} from '../constants/values';
import Post from './Post';

const filterPosts = (posts, category) => {
    return Object.keys(posts)
            .filter((id) => {
                const post = posts[id];

                return !category || post.category === category;
            })
            .filter((id) => {
                const post = posts[id];

                return !post.deleted;
            });
};

const Posts = ({
    category,
    onClick,
    onDelete,
    onEdit,
    onVote,
    posts = []
}) => {
    return (
        <div>
            {filterPosts(posts, category)
                .map((id) => {
                    const post = posts[id];

                    return (
                        <Post
                            key={`post-${id}`}
                            onVoteDown={onVote.bind(null, post.id, DOWN_VOTE)}
                            onVoteUp={onVote.bind(null, post.id, UP_VOTE)}
                            onDelete={onDelete.bind(null, post.id)}
                            onEdit={onEdit.bind(null, post.id)}
                            {...post}
                        />
                    );
                })
            }
        </div>
    );
};

export default Posts;
