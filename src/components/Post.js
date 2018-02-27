import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DEFAULT_DATE_FORMAT } from '../constants/values';
import Score from './Score';

const Post = ({
    author,
    body,
    category,
    currentText,
    id,
    isEditing = false,
    showEdit = false,
    onEdit = () => {},
    onSave = () => {},
    onChange = () => {},
    onVoteDown = () => {},
    onVoteUp = () => {},
    timestamp,
    title,
    voteScore
}) => {
    return (
        <div key={id} className="post-container">
            {showEdit &&
                <div className="right">
                    {isEditing && <button className="action action-save" onClick={onSave}>&#10004;</button>}
                    {!isEditing && <button className="action action-edit" onClick={onEdit}>&#x270E;</button>}
                    {!isEditing && <button className="action action-delete" onClick={() => {}}>X</button>}
                </div>}
            <Link
                to={`/${category}/${id}`}
                className="post-title">
                {title}
            </Link>
            {isEditing && <textarea className="post-body" placeholder="Write your text here..." type="text" value={currentText} onChange={onChange} />}
            {!isEditing && <p className="post-body">
                {body}
            </p>}
            <div className="post-footer">
                <p className="post-author right">
                    {author}
                </p>
                <p className="post-date right">
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
