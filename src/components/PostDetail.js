import React, { Component } from 'react';
import moment from 'moment';

class PostDetail extends Component {
    render() {
        return (
            <div className="post">
                {this.props.match.params.id}
            </div>
        );
    }
};

export default PostDetail;
