// App.js
import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import Hero from './components/Hero';
import Home from './components/Home';


const App = () => {
  return (
    <Router>
      <NavigationBar />
      <div>
        <Hero />
        <Home />
      </div>
    </Router>
  );
};

export default App;
