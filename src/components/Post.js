import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DEFAULT_DATE_FORMAT } from '../constants/values';

const Post = ({ author, body, id, timestamp, title }) => {
    return (
        <div key={id} className="post">
            <Link
                to={`/post/${id}`}
                className="post-title">
                {title}
            </Link>
            <p className="post-body">
                {body}
            </p>
            <div className="post-footer">
                <p className="post-date">
                    {moment(timestamp).format(DEFAULT_DATE_FORMAT)}
                </p>
                <p className="post-author">
                    {author}
                </p>
            </div>
        </div>
    );
};

export default Post;
