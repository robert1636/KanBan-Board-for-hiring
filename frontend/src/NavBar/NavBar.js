import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (

    <Nav className="navbar bg-primary fixed-top" activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/" className="Home"><h4>Kanban Board for hiring</h4></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/new-candidate">
          <Button ><h4>New Candidate</h4></Button>{' '}
        </Link>
      </Nav.Item>
      <Nav.Item>
        {
          !auth0Client.isAuthenticated() &&
          <Button onClick={auth0Client.signIn} ><h4>Sign In</h4></Button>
        }
      </Nav.Item>
      <Nav.Item>
        {
          auth0Client.isAuthenticated() &&
          <div>
            <label className="mr-2 text-white"><h5>{auth0Client.getProfile().name}</h5></label>
            <Button onClick={() => { signOut() }}><h4>Sign Out</h4></Button>
          </div>
        }
      </Nav.Item>


    </Nav>
  );
}

export default withRouter(NavBar);