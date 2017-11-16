import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link, Route } from 'react-router-dom'
import * as mainActionCreators from './actions/main';
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import { UNDEFINED_CATEGORY } from './constants/values';
import './styles/App.css';

class App extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.selectedCategoryIndex === UNDEFINED_CATEGORY &&
                    nextProps.selectedCategoryIndex !== UNDEFINED_CATEGORY) ||
            (this.props.selectedCategoryIndex !== nextProps.selectedCategoryIndex)) {
            const { categories, selectedCategoryIndex } = nextProps;

            this.props.fetchCategoryPosts(categories[selectedCategoryIndex].name);
        }
    }

    handleCategorySelect(event, categoryId) {
        event.preventDefault();

        this.props.selectCategory(categoryId);
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
                <Route exact path='/' render={() => (
                    <div>
                        <NavBar
                            categories={categories}
                            onCategoryClick={this.handleCategorySelect.bind(this)}
                            selectedCategoryIndex={selectedCategoryIndex}
                        />
                        <Posts
                            posts={posts}
                            category={categories[selectedCategoryIndex] && categories[selectedCategoryIndex].name}
                        />
                    </div>
                )}/>
                <Route exact path='/post/:id' component={PostDetail} />
            </div>
        );
    }
};

const mapStateToProps = ({ main }) => {
    return {
        categories: main.categories,
        posts: main.posts,
        selectedCategoryIndex: main.selectedCategoryIndex
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(mainActionCreators, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

