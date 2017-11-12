import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActionCreators from '../actions/main';

class Loading extends Component {
  componentDidMount() {
    const { loadingText } = this.props;
    const STOPPER = `${loadingText}...`;

    this.interval = window.setInterval(() => {
      if (this.props.loadingText === STOPPER) {
        this.props.resetLoadingText();
      } else {
        this.props.setLoadingText(`${this.props.loadingText}.`);
      }
    }, this.props.speed)
  }

  componentWillUnmount() {
    this.props.resetLoadingText();

    window.clearInterval(this.interval);
  }

  render() {
    return (
      <p className="loader">
        {this.props.loadingText}
      </p>
    )
  }
}

Loading.propTypes = {
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  speed: 300
};

const mapStateToProps = ({ main }) => {
    return {
        loadingText: main.loadingText
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(mainActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
