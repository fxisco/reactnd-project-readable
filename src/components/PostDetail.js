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
        this.onPostChange = this.onPostChange.bind(this);
        this.onVote = this.onVote.bind(this);
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

    onDeleteComment(id) {
        this.props.deletePostComment(id);
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

        this.onCommentEditSave();
    }

    onCommentEditSave() {
        const { comments } = this.props;
        const { comment, currentCommentId } = this.state;
        const currentComment = Object.values(comments).find(item => item.id === currentCommentId);
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

    onVote(id, type) {
        this.props.votePost(id, type);
    }

    render() {
        const {
            author,
            comment,
            currentPostText,
            isEditingComment,
            isEditingPost
        } = this.state;

        const { comments, post } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <Link to={post ? `/${post.category}` : '/'} className="back-button">↵ Back</Link>
                </div>
                {post &&
                    <Post {...post}
                        currentText={currentPostText}
                        onChange={this.onPostChange}
                        onEdit={this.onPostEdit}
                        onSave={this.onPostSave}
                        isEditing={isEditingPost}
                        onVoteDown={this.onVote.bind(null, post.id, DOWN_VOTE)}
                        onVoteUp={this.onVote.bind(null, post.id, UP_VOTE)}
                        showEdit={true}
                    />
                }
                <div className="row">
                    <input className="comment-author" name="author" onChange={this.onTextChange} value={author} placeholder="Enter author" />
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
                        />
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
