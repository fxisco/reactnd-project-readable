import React, { Component } from 'react';
import Loading from './Loading';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActionCreators from '../actions/main';

class PostDetail extends Component {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    render() {
        return (
            <div className="post">
                Hello
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
