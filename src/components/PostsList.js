import React, { Component } from 'react';
import Loading from './Loading';
import Post from './Post';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as postsActionCreators from '../actions/posts';
import NavBar from './NavBar';
import Posts from './Posts';


class PostsList extends Component {
    render() {
        const { categories, posts } = this.props;
        const selectedCategory = this.props.match.params.category || '';
        return (
            <div>
                <NavBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                />
                <Posts
                    posts={posts}
                    category={this.props.match.params.category}
                />
            </div>
        );
    }
};

const mapStateToProps = ({ main, posts }) => {
    return {
        categories: main.categories,
        posts: posts.posts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(postsActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
