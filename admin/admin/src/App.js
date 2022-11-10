import './App.css';
import Login from './login';
import Register from './register';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import UserContext from './context';

//tab inports:
import Profile from './tabs/profile';
import HomeTab from './tabs/home';
import CreateTrials from './tabs/createTrials';
import Players from './tabs/players';
import TrialList from './tabs/trialList';
import Settings from './tabs/settings';
import { useState } from 'react';

function App() {

  const[sport, setSport] = useState('')
  const[userEmail, setUserEmail] = useState('')

  return (
    <>
    <UserContext.Provider value={{chosenSport: sport, setSport: setSport, userEmail: userEmail, setUserEmail: setUserEmail}}>

      <Routes>
             
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        // tabs
        <Route path='/tabs/home' element={<HomeTab />} /> 
        <Route path='/tabs/createTrials' element={<CreateTrials />} />
        <Route path='/tabs/profile' element={<Profile />} />
        <Route path='/tabs/players' element={<Players />} />
        <Route path='/tabs/trialList' element={<TrialList />} />
        <Route path='/tabs/settings' element={<Settings />} /> 

      </Routes>
    
      </UserContext.Provider>
    </>
  );
}

export default App;
