import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DEFAULT_DATE_FORMAT } from '../constants/values';

const Posts = ({ onClick, posts = [] }) => {
    return (
        <div className="posts-container">
            {Object.keys(posts).map((postId) => {
                const post = posts[postId];

                return (
                    <div key={postId} className="post">
                        <Link
                            to={`/post/${postId}`}
                            className="post-title">
                            {post.title}
                        </Link>
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
