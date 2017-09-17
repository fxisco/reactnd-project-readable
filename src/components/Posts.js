import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '../constants/values';

const Posts = ({ posts = [] }) => {
    return (
        <div className="posts-container">
            {Object.keys(posts).map((postId) => {
                const post = posts[postId];

                return (
                    <div key={postId} className="post">
                        <p className="post-title">
                            {post.title}
                        </p>
                        <p className="post-body">
                            {post.body}
                        </p>
                        <div className="post-footer">
                            <p className="post-date">
                                {moment(post.timestamp).format(DEFAULT_DATE_FORMAT)}
                            </p>
                            <p className="post-author">
                                {post.author}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Posts;
