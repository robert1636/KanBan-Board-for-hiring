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

    <Nav className="navbar bg-primary fixed-top"
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/" className="navbar-brand"><h4>Kanban Board for hiring</h4></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/new-candidate">
          <Button className="mr-2 text-white" variant="outline-primary">Add</Button>{' '}
        </Link>
      </Nav.Item>
      <Nav.Item>
        {
          !auth0Client.isAuthenticated() &&
          <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
        }
      </Nav.Item>
      <Nav.Item>
        {
          auth0Client.isAuthenticated() &&
          <div>
            <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
            <button className="btn btn-dark" onClick={() => { signOut() }}>Sign Out</button>
          </div>
        }
      </Nav.Item>


    </Nav>
  );
} 

export default withRouter(NavBar);