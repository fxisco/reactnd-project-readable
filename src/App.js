import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link, Route } from 'react-router-dom'
import * as mainActionCreators from './actions/main';
import * as postsActionCreators from './actions/posts';
import PostDetail from './components/PostDetail';
import PostsContainer from './containers/PostsContainer';
import './styles/App.css';

class App extends Component {
    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchPosts();
    }

    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <Link to="/" className="app-title">
                        ReadApp
                    </Link>
                </div>
                <Route exact path='/:category?' component={PostsContainer} />
                <Route exact path='/:category/:id' component={PostDetail} />
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...mainActionCreators,
        ...postsActionCreators
    }, dispatch);
};

export default withRouter(connect(() => {}, mapDispatchToProps)(App))
