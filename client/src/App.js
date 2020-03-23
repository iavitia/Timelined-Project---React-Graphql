import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'fomantic-ui-css/semantic.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';
import ProtectedRoute from './utils/ProtectedRoute';

import { Home, Login, Register } from './components/pages';
import { Navbar, Footer, TimelineForm } from './components/organisms';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Route exact path='/' component={Home} />
        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/register' component={Register} />
        <ProtectedRoute exact path='/newtimeline' component={TimelineForm} />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
