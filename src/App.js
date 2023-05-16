import React from 'react';
import './App.css';
import { BrowserRouter,Navigate,Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import CreateChat from './components/CreateChat/CreateChat';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navigate to='/login' replace={true}/>
      <Routes >
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<CreateChat />} />
        <Route path='/chat/:num' element={<Chat />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
