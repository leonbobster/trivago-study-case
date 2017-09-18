import React from 'react';
import './bootstrap.css';
import './App.css';

import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';

import { Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Analyzer from './../../containers/analyzer/Analyzer';
import ReviewList from './../../containers/review-list/ReviewList';
import CreateReview from './../../containers/create-review/CreateReview';
import TopicList from './../topic-list/TopicList';
import PageNotFound from './../page-not-found/PageNotFound';

const App = (props) => {
  return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <span>Trivago Study Case</span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav navbar>
            <LinkContainer exact to="/">
              <NavItem>Analyzer</NavItem>
            </LinkContainer>
            <LinkContainer to="/review-list">
              <NavItem>Reviews</NavItem>
            </LinkContainer>
            <LinkContainer to="/topic-list">
              <NavItem>Topics</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container" id="content">
        <Switch>
          <Route exact path="/" component={Analyzer} />
          <Route path="/review-list" component={ReviewList} />
          <Route path="/topic-list" component={TopicList} />
          <Route path="/create-review" component={CreateReview} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
