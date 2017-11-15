import React, { Component } from 'react';
import Loading from './Loading';
import Post from './Post';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as mainActionCreators from '../actions/main';


class PostDetail extends Component {
    componentDidMount() {
        // this.props.fetchPost(this.props.match.params.id);
        this.props.fetchPostComments(this.props.match.params.id);
    }

    render() {
        const post = this.props.posts[this.props.match.params.id];

        return (
            <div className="container">
                <div className="row">
                    <Link to='/' className="back-button">↵ Back</Link>
                </div>
                {post && <Post {...post} />}
            </div>
        );
    }
};

const mapStateToProps = ({ main }) => {
    return {
        categories: main.categories,
        posts: main.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(mainActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
