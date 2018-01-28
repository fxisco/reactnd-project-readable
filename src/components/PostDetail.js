import React, { Component } from 'react';
import Loading from './Loading';
import Post from './Post';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as mainActionCreators from '../actions/main';
import CommentsList from './CommentsList';


class PostDetail extends Component {
    componentDidMount() {
        const { post, comments } = this.props;

        if (!post) {
            this.props.fetchPost(this.props.match.params.id);
        }

        if (!comments) {
            this.props.fetchPostComments(this.props.match.params.id);
        }
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
                        <CommentsList comments={comments} />
                    </div>
                }
            </div>
        );
    }
};

const mapStateToProps = ({ main }, props) => {
    return {
        comments: main.postsComments[props.match.params.id],
        post: main.posts[props.match.params.id],
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(mainActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
