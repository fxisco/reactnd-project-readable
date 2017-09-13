import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mainActionCreators from './actions/main';
import NavBar from './components/NavBar';
import './styles/App.css';

class App extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    handleCategorySelect(event, categoryId) {
        event.preventDefault();

        this.props.selectCategory(categoryId);
    }

    render() {
        const { categories, selectedCategoryIndex } = this.props;

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
            </div>
        );
    }
};

const mapStateToProps = ({ main }) => {
    return {
        categories: main.categories,
        selectedCategoryIndex: main.selectedCategoryIndex
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(mainActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
