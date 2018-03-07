import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActionCreators from '../actions/posts';
import { generateId } from '../helpers/utils';
import {
    sortByDateASC,
    sortByDateDESC,
    sortByVoteScoreASC,
    sortByVoteScoreDESC,
} from '../helpers/array';
import { SORT_BY, SORT_ORDER } from '../constants/values';
import NavBar from '../components/NavBar';
import Posts from '../components/Posts';

const { DATE, SCORE } = SORT_BY;
const { ASC, DESC } = SORT_ORDER;

class PostsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: '',
            body: '',
            title: '',
            sortBy: DATE,
            sortOrder: ASC,
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.onVote = this.onVote.bind(this);
        this.onPostDelete = this.onPostDelete.bind(this);
        this.onPostSubmit = this.onPostSubmit.bind(this);
    }

    onTextChange(event) {
        const { target: { name, value }} = event;

        this.setState({
            [name]: value
        });
    }

    onVote(id, type) {
        this.props.votePost(id, type);
    }

    onPostSubmit() {
        const {
            match: { params: { category } },
        } = this.props;

        const {
            author,
            body,
            title
        } = this.state;

        this.props.submitPost({
            author,
            body,
            category,
            id: generateId(),
            timestamp: Date.now(),
            title,
        }, this.props.match.params.category);

        this.setState({
            author: '',
            body: '',
            title: ''
        });
    }

    sortPostsBy(value) {
        const change = {
            sortBy: value
        };

        if (value === this.state.sortBy) {
            change.sortOrder = this.state.sortOrder === ASC ? DESC: ASC;
        }

        this.setState(change);
    }

    onPostDelete(id) {
        this.props.deletePost(id);
    }

    render() {
        const {
            categories,
            posts,
        } = this.props;

        const {
            author,
            body,
            sortBy,
            sortOrder,
            title,
        } = this.state;
        const selectedCategory = this.props.match.params.category || '';

        let sortOrderDirection;

        if (sortBy === DATE) {
            sortOrderDirection = sortOrder === ASC ? sortByDateASC : sortByDateDESC;

        } else {
            sortOrderDirection = sortOrder === ASC ? sortByVoteScoreASC : sortByVoteScoreDESC;
        }
        const sortedPosts = [...posts].sort(sortOrderDirection);

        return (
            <div>
                <NavBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                />
                <div className="container">
                    <div className="post-sorter">
                        <span>Sort by: </span>
                        <ul className="post-sorter-list">
                            <li>
                                <button className={`sort-button ${sortBy === DATE ? 'selected': ''}`} onClick={() => { this.sortPostsBy(DATE); }}>
                                    {sortBy === DATE ? `Date ${sortOrder === ASC ? '↑': '↓'}` : 'Date'}
                                </button>
                            </li>
                            <li>
                                <button className={`sort-button ${sortBy === SCORE ? 'selected': ''}`} onClick={() => { this.sortPostsBy(SCORE); }}>
                                    {sortBy === SCORE ? `Score ${sortOrder === ASC ? '↑': '↓'}` : 'Score'}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="new-post-container">
                        <div className="new-post-info">
                            <div className="author">
                                <input name="author" value={author} placeholder="Author" onChange={this.onTextChange} />
                            </div>
                            <div className="title">
                                <input name="title" value={title} placeholder="Title" onChange={this.onTextChange} />
                            </div>
                        </div>
                        <div className="new-post-text">
                            <textarea className="new-post" name="body" placeholder="Write your text here..." type="text" value={body} onChange={this.onTextChange} />
                            {author && body && title &&<button className="new-post-button" onClick={this.onPostSubmit}>Submit</button>}
                        </div>
                    </div>
                    <Posts
                        category={this.props.match.params.category}
                        posts={sortedPosts}
                        onVote={this.onVote}
                        onDelete={this.onPostDelete}
                    />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
