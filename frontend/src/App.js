import React, { Component } from 'react';
// import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Candidate from './Candidate/Candidate';
import Candidates from './Candidates/Candidates';
import Callback from './Callback';
import NewCandidate from './NewCandidate/NewCandidate';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import Home from './Home/Home';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({
      checkingSession:false, 
    });
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/candidate/:candidateId' component={Candidate}/>
        <Route exact path='/callback' component={Callback}/>
        <SecuredRoute path='/new-candidate'
                  component={NewCandidate}
                  checkingSession={this.state.checkingSession} />
      </div>
    );
  }
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       checkingSession: true,
//     }
//   }
//   async componentDidMount() {
//     if (this.props.location.pathname === '/callback') {
//       this.setState({checkingSession:false});
//       return;
//     }
//     // if (this.props.location.pathname === '/callback') return;
//     try {
//       await auth0Client.silentAuth();
//       this.forceUpdate();
//     } catch (err) {
//       if (err.error !== 'login_required') console.log(err.error);
//     }
//     this.setState({checkingSession:false});
//   }
//   render() {
//     return (
//       <div>
//         <NavBar/>
//         <Route exact path='/' component={Candidates}/>
//         <Route exact path='/candidate/:candidateId' component={Candidate}/>
//         <Route exact path='/callback' component={Callback}/>
//         <SecuredRoute path='/new-candidate'
//                   component={NewCandidate}
//                   checkingSession={this.state.checkingSession} />
//       </div>
//     );
//   }
// }

export default withRouter(App);;