import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link, Route } from 'react-router-dom'
import * as mainActionCreators from './actions/main';
import * as postsActionCreators from './actions/posts';
import PostDetail from './components/PostDetail';
import PostsList from './components/PostsList';
import { UNDEFINED_CATEGORY } from './constants/values';
import './styles/App.css';

class App extends Component {
    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchPosts();
    }

    render() {
        const { categories, posts, selectedCategoryIndex } = this.props;

        return (
            <div className="app">
                <div className="app-header">
                    <Link to="/" className="app-title">
                        ReadApp
                    </Link>
                </div>
                <Route exact path='/:category?' component={PostsList} />
                <Route exact path='/:category/:id' component={PostDetail} />
            </div>
        );
    }
};

const mapStateToProps = ({ main, posts }) => {
    return {
        categories: main.categories,
        posts: posts.posts,
        selectedCategoryIndex: main.selectedCategoryIndex
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...mainActionCreators,
        ...postsActionCreators
    }, dispatch);
};

// @TODO: check if connect App.js is required

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
