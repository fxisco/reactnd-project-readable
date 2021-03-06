import React from 'react';
import moment from 'moment';
import {
    DEFAULT_DATE_FORMAT,
    DOWN_VOTE,
    UP_VOTE
} from '../constants/values';
import Score from './Score';

const Comment = ({ author, body, deleted, id, onEditComment,onDeleteComment, onVoteDown, onVoteUp, voteScore, timestamp }) => {
    return (
        deleted ? null :
        <li className="comment-container">
            <div className="comment-action">
                <button className="action action-edit" onClick={onEditComment}>&#x270E;</button>
                <button className="action action-delete" onClick={onDeleteComment}>X</button>
            </div>
            <div>
                <b>{author}</b>
            </div>
            <div>
                <p>{body}</p>
                <p className="comment-date right">
                    {moment(timestamp).format(DEFAULT_DATE_FORMAT)}
                </p>
            </div>
            <div>
                <Score
                    voteScore={voteScore}
                    onVoteUp={onVoteUp}
                    onVoteDown={onVoteDown}
                />
            </div>
        </li>
    );
}

const CommentsList = ({
    comments = [],
    onDeleteComment = () => {},
    onEditComment = () => {},
    onVote = () => {},
}) => {
    return (
        <ul className="post-comments-container">
            {Object.keys(comments)
                .sort((a, b) => {
                    const commentA = comments[a];
                    const commentB = comments[b];

                    return commentB.timestamp - commentA.timestamp;
                })
                .map((id) => {
                    const comment = comments[id];

                    return (
                        <Comment
                            key={`comment-${id}`}
                            id={id} {...comment}
                            onEditComment={onEditComment.bind(null, comment.id)}
                            onDeleteComment={onDeleteComment.bind(null, comment.id)}
                            onVoteUp={onVote.bind(null, comment.id, UP_VOTE)}
                            onVoteDown={onVote.bind(null, comment.id, DOWN_VOTE)}
                        />
                    )
                })}
        </ul>
    );
};

export default CommentsList;
