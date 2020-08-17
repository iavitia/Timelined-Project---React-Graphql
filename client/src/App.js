import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'fomantic-ui-css/semantic.css';
// import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';
import ProtectedRoute from './utils/ProtectedRoute';

import {
  Home,
  Login,
  Profile,
  Register,
  SingleTimeline,
} from './components/pages';
import { Navbar, Footer, TimelineForm } from './components/organisms';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='page-container'>
          <div className='content-wrap'>
            <Navbar />
            <Route exact path='/' component={Home} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
            <Route exact path='/profile/:username' component={Profile} />
            <ProtectedRoute
              exact
              path='/newtimeline'
              component={TimelineForm}
            />
            <Route
              exact
              path='/timelines/:timelineId'
              component={SingleTimeline}
            />
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
