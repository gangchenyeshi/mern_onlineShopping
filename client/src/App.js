import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {DataProvider} from './GlobalState';
import Header from './components/header/Header';
import MainPages from './components/MainPages/Pages';
import Footer from './components/MainPages/footer/Footer'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Header />
          <MainPages />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  )
}

export default App;