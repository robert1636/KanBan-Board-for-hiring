import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class Candidates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidates: null,
    };
  }

  async componentDidMount() {
    const candidates = (await axios.get('http://localhost:8081/')).data;
    this.setState({
      candidates,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        {/* <Link to="/new-candidate">
            <Button variant="outline-primary">Add</Button>{' '}
        </Link> */}
          {this.state.candidates === null && <p>Loading candidates...</p>}
          {
            this.state.candidates && this.state.candidates.map(candidate => (
              <div key={candidate.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/candidate/${candidate.id}`}>
                      <Button variant="outline-success">{candidate.name}</Button>{' '}
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Candidates;