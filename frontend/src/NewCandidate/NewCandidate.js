import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import axios from 'axios';

class NewCandidate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      name: '',
      education: '',
      contact: '',
    };
  }

  updateName(value) {
    this.setState({
      name: value,
    });
  }

  updateEducation(value) {
    this.setState({
      education: value,
    });
  }

  updateContact(value) {
    this.setState({
      contact: value,
    });
  }

  async submit() {
    this.setState({
      disabled: true,
    });

    await axios.post('http://localhost:8081', {
      name: this.state.name,
      education: this.state.education,
      contact: this.state.contact,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });

    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Candidate</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateName(e.target.value)}}
                    className="form-control"
                    placeholder="Candidate name."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Education:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateEducation(e.target.value)}}
                    className="form-control"
                    placeholder="Candidate education."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Contact:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateContact(e.target.value)}}
                    className="form-control"
                    placeholder="Candidate contact."
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.submit()}}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NewCandidate);