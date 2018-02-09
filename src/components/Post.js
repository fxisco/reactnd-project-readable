import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
    DEFAULT_DATE_FORMAT,
    DOWN_VOTE,
    UP_VOTE,
} from '../constants/values';
import Score from './Score';

const Post = ({
    author,
    body,
    category,
    id,
    onVoteDown = () => {},
    onVoteUp = () => {},
    timestamp,
    title,
    voteScore
}) => {
    return (
        <div key={id} className="post-container">
            <Link
                to={`/${category}/${id}`}
                className="post-title">
                {title}
            </Link>
            <p className="post-body">
                {body}
            </p>
            <div className="post-footer">
                <p className="post-author">
                    {author}
                </p>
                <p className="post-date">
                    {moment(timestamp).format(DEFAULT_DATE_FORMAT)}
                </p>
            </div>
            <Score
                voteScore={voteScore}
                onVoteUp={onVoteUp}
                onVoteDown={onVoteDown}
            />
        </div>
    );
};

export default Post;
