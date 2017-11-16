import React from 'react';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '../constants/values';
import Score from './Score';

const CommentsList = ({ comments }) => {
    return (
        <ul className="post-comments-container">
            {Object.keys(comments).map((id) => {
                const comment = comments[id];
                const { author, body, deleted, voteScore, timestamp } = comment;

                return (
                    deleted ? null :
                    <li key={`post-comment-${id}`} className="comment-container">
                        <div>
                            <b>{author}</b>
                        </div>
                        <div>
                            <p>{body}</p>
                            <p className="comment-date">
                                {moment(timestamp).format(DEFAULT_DATE_FORMAT)}
                            </p>
                        </div>
                        <div>
                            <Score
                                voteScore={voteScore}
                            />
                        </div>
                    </li>
                )
            })}
        </ul>
    );
};

export default CommentsList;
