import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as postActionCreators from '../actions/posts';
import CommentsList from './CommentsList';


class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.onDeleteComment = this.onDeleteComment.bind(this);
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

    render() {
        const { comments, post } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <Link to={post ? `/${post.category}` : '/'} className="back-button">↵ Back</Link>
                </div>
                {post && <Post {...post} />}
                {comments && Object.keys(comments).length > 0 &&
                    <div className="row">
                        <h2>
                            Comments
                        </h2>
                        <CommentsList comments={comments} onDeleteComment={this.onDeleteComment} />
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
