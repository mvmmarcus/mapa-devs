import React from 'react';
import 'react-native-gesture-handler';
import Routes from './src/Routes';
import { StatusBar } from 'react-native';

function App() {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7D40E7"></StatusBar>
    <Routes></Routes>
    </>
  );
}

export default App;

