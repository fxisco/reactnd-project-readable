import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as postActionCreators from '../actions/posts';
import CommentsList from './CommentsList';
import { generateId  } from '../helpers/utils';


class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: '',
            comment: '',
            isEditing: false,
            currentCommentId: '',
        }

        this.onDeleteComment = this.onDeleteComment.bind(this);
        this.onEditComment = this.onEditComment.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.onCommentEditReset = this.onCommentEditReset.bind(this);
        this.onCommentEditSave = this.onCommentEditSave.bind(this);
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
            isEditing: true,
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
            isEditing: false
        });
    }

    render() {
        const { author, comment, isEditing } = this.state;
        const { comments, post } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <Link to={post ? `/${post.category}` : '/'} className="back-button">↵ Back</Link>
                </div>
                {post && <Post {...post} />}
                <div className="row">
                    <input className="comment-author" name="author" onChange={this.onTextChange} value={author} placeholder="Enter author" />
                    <input className="comment-input" name="comment" onChange={this.onTextChange} value={comment} placeholder="Enter comment" />
                    <div className="comment-form-submit">
                        {isEditing && comment &&
                            <div>
                                <button className="comment-save" onClick={this.onCommentEditSave}>Save</button>
                                <button className="comment-cancel" onClick={this.onCommentEditReset}>Cancel</button>
                            </div>
                        }
                        {!isEditing && author && comment && <button className="comment-submit" onClick={this.onCommentSubmit}>Submit</button>}
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
