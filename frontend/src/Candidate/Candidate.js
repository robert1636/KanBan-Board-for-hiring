import React, {Component} from 'react';
import axios from 'axios';
import SubmitComment from './SubmitComment';
import auth0Client from '../Auth';

class Candidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidate: null,
    };

    this.submitComment = this.submitComment.bind(this);
  }

  async componentDidMount() {
    await this.refreshCandidate();
  }

  async refreshCandidate() {
    const { match: { params } } = this.props;
    const candidate = (await axios.get(`http://localhost:8081/${params.candidateId}`)).data;
    this.setState({
      candidate,
    });
  }

  async submitComment(answer) {
    await axios.post(`http://localhost:8081/answer/${this.state.candidate.id}`, {
      answer,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshCandidate();
  }

  render() {
    const {candidate} = this.state;
    if (candidate === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{candidate.name}</h1>
            <p className="lead">{candidate.education}</p>
            <p className="lead">{candidate.contact}</p>
            <hr className="my-4" />
            <SubmitComment candidateId={candidate.id} submitComment={this.submitComment} />
            <p>Comments:</p>
            {
              candidate.answers.map((answer, idx) => (
                // TODO: display average
                <p className="lead" key={idx}>{answer.answer}</p>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Candidate;