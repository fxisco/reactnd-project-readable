import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mainActionCreators from './actions/main';
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import { UNDEFINED_CATEGORY } from './constants/values';
import './styles/App.css';

class App extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedCategoryIndex === UNDEFINED_CATEGORY &&
            nextProps.selectedCategoryIndex !== UNDEFINED_CATEGORY) {
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
                    <span className="app-title">ReadApp</span>
                </div>
                <NavBar
                    categories={categories}
                    onCategoryClick={this.handleCategorySelect.bind(this)}
                    selectedCategoryIndex={selectedCategoryIndex}
                />
                <Posts
                    posts={posts}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
