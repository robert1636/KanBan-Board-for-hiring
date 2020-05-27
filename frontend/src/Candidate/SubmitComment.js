import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

class SubmitComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: ''
    };
  }

  updateName(value) {
    this.setState({
      answer: value
    });
  }

  submit() {
    this.props.submitComment(this.state.answer);
    this.setState({
      answer: '',
    });
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">comment:</label>
          <input
            type="text"
            onChange={(e) => {this.updateName(e.target.value)}}
            className="form-control"
            placeholder="Please comment on this candidate."
            value={this.state.answer}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {this.submit()}}>
          Submit Comment
        </button>
        <hr className="my-4" />
      </Fragment>
    )
  }
}

export default withRouter(SubmitComment);