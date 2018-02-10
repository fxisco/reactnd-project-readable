import React from 'react';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '../constants/values';
import Score from './Score';

const Comment = ({ author, body, deleted, id, onDeleteComment, voteScore, timestamp }) => {
    return (
        deleted ? null :
        <li className="comment-container">
            <div className="comment-action">
                <button className="action-delete" onClick={onDeleteComment}>X</button>
            </div>
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
    );
}

const CommentsList = ({ comments, onDeleteComment }) => {
    return (
        <ul className="post-comments-container">
            {Object.keys(comments).map((id) => {
                const comment = comments[id];

                return (
                    <Comment
                        key={`comment-${id}`}
                        id={id} {...comment}
                        onDeleteComment={onDeleteComment.bind(null, comment.id)}
                    />
                )
            })}
        </ul>
    );
};

export default CommentsList;
