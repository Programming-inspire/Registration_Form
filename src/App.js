import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="container">
      <div className="left-panel">
        <RegistrationForm />
      </div>
      <div className="right-panel">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
