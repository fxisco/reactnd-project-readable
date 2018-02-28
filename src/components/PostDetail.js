import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as postActionCreators from '../actions/posts';
import CommentsList from './CommentsList';
import { generateId  } from '../helpers/utils';
import {
    DOWN_VOTE,
    UP_VOTE,
} from '../constants/values';

class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: '',
            comment: '',
            isEditingComment: false,
            isEditingPost: false,
            currentCommentId: '',
            currentPostText: ''
        }

        this.onDeleteComment = this.onDeleteComment.bind(this);
        this.onEditComment = this.onEditComment.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.onCommentEditReset = this.onCommentEditReset.bind(this);
        this.onCommentEditSave = this.onCommentEditSave.bind(this);
        this.onPostEdit = this.onPostEdit.bind(this);
        this.onPostSave = this.onPostSave.bind(this);
        this.onPostDelete = this.onPostDelete.bind(this);
        this.onPostChange = this.onPostChange.bind(this);
        this.onPostVote = this.onPostVote.bind(this);
        this.onCommentVote = this.onCommentVote.bind(this);

    }
    componentDidMount() {
        const { post, comments } = this.props;

        if (!post) {
            this.props.fetchPost(this.props.match.params.id);
        }

        if (!comments) {
            this.props.fetchPostComments(this.props.match.params.id);
        }
    }

    onDeleteComment(commentId) {
        const { post } = this.props;

        this.props.deletePostComment(post.id, commentId);
    }

    onEditComment(id) {
        const { comments } = this.props;
        const currentComment = Object.values(comments).find(item => item.id === id);
        const { author, body } = currentComment;

        this.setState({
            author,
            comment: body,
            isEditingComment: true,
            currentCommentId: id,
        });
    }

    onTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onCommentSubmit() {
        const { author, comment } = this.state;

        this.props.postComment({
            author,
            body: comment,
            id: generateId(),
            timestamp: Date.now(),
            parentId: this.props.match.params.id,
        });

        this.onCommentEditReset();
    }

    onCommentEditSave() {
        const { comments } = this.props;
        const { comment, currentCommentId } = this.state;
        const commentUpdate = {
            body: comment,
            timestamp: Date.now(),
        };

        this.props.postCommentEdit(currentCommentId, commentUpdate);

        this.onCommentEditReset();
    }

    onCommentEditReset() {
        this.setState({
            author: '',
            comment: '',
            isEditingComment: false
        });
    }

    onPostEdit() {
        this.setState({
            isEditingPost: true,
            currentPostText: this.props.post.body
        });
    }

    onPostSave() {
        const { post } = this.props;
        const { currentPostText } = this.state;

        this.props.savePost(post.id, {
            body: currentPostText
        });

        this.setState({
            isEditingPost:false
        });
    }

    onPostChange(event) {
        this.setState({
            currentPostText: event.target.value
        });
    }

    onPostVote(id, type) {
        this.props.votePost(id, type);
    }

    onCommentVote(id, type) {
        this.props.voteComment(id, type);
    }

    onPostDelete(id) {
        this.props.deletePost(id);
    }

    render() {
        const {
            author,
            comment,
            currentPostText,
            isEditingComment,
            isEditingPost
        } = this.state;

        const { comments, match, post } = this.props;

        return (
            <div className="container">
                {post && post.deleted ?
                    <div>
                        <h1>Comment deleted</h1>
                        <p>
                            <Link to={`/${match.params.category}`} className="back-button">↵ Back</Link>
                        </p>
                    </div> :
                    <div>
                        <div className="row">
                            <Link to={post ? `/${post.category}` : '/'} className="back-button">↵ Back</Link>
                        </div>
                        {post &&
                            <Post {...post}
                                currentText={currentPostText}
                                onChange={this.onPostChange}
                                onDelete={this.onPostDelete.bind(null, post.id)}
                                onEdit={this.onPostEdit}
                                onSave={this.onPostSave}
                                isEditing={isEditingPost}
                                onVoteDown={this.onPostVote.bind(null, post.id, DOWN_VOTE)}
                                onVoteUp={this.onPostVote.bind(null, post.id, UP_VOTE)}
                                showEdit={true}
                            />
                        }
                        <div className="row">
                            <fieldset>
                                <legend>{isEditingComment ? 'Edit': 'New'} Comment</legend>
                                <input className="comment-author" name="author" onChange={this.onTextChange} value={author} placeholder="Enter author" readOnly={isEditingComment} disabled={isEditingComment} />
                                <input className="comment-input" name="comment" onChange={this.onTextChange} value={comment} placeholder="Enter comment" />
                                <div className="comment-form-submit">
                                    {isEditingComment && comment &&
                                        <div>
                                            <button className="comment-save" onClick={this.onCommentEditSave}>Save</button>
                                            <button className="comment-cancel" onClick={this.onCommentEditReset}>Cancel</button>
                                        </div>
                                    }
                                    {!isEditingComment && author && comment && <button className="comment-submit" onClick={this.onCommentSubmit}>Submit</button>}
                                </div>
                            </fieldset>
                        </div>
                        {comments && Object.keys(comments).length > 0 &&
                            <div className="row">
                                <h2>
                                    Comments
                                </h2>
                                <CommentsList
                                    comments={comments}
                                    onDeleteComment={this.onDeleteComment}
                                    onEditComment={this.onEditComment}
                                    onVote={this.onCommentVote}
                                />
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
};

const mapStateToProps = ({ posts }, props) => {
    return {
        comments: posts.postsComments[props.match.params.id],
        post: posts.postsDetails[props.match.params.id],
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(postActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
