import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import SingleCountry from './components/SingleCountry';
import Error from './components/Error';
import './App.css';
import CardView from './components/CardView';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<CardView />} />
          <Route path="/country/:ccn3" element={<SingleCountry />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
