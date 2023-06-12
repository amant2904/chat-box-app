import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
import Authentication from './components/authentication/Authentication';
import Welcome from './components/welcome/Welcome';
import { useSelector } from 'react-redux';


function App() {
  const login = useSelector(state => state.auth.login);

  return (
    <React.Fragment>
      {login && <Welcome />}
      {!login && <Authentication />}
    </React.Fragment>
  );
}

export default App;
