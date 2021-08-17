import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
// import ConnectFourProvider from 'src/providers/connectFour';
// import ConnectFourHost from 'src/components/ConnectFourHost';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    // <ConnectFourProvider>
    //   <ConnectFourHost />
    // </ConnectFourProvider>
  );
}

export default App;
