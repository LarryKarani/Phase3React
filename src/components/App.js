import '../App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Home from './Home'
import CharacterForm from './CharacterForm'



function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // primary db state
  const [characters, setCharacters] = useState([]);
  const [playerAddingTo, setPlayerAddingTo] = useState({});
  const [currentUser, setCurrentUser] = useState({}); // login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // login
  const id = localStorage.getItem('user_id')  // login


// LOGIN SECTION
  useEffect(() => {
    if (id) {
      fetch('http://localhost:9292/users/' + id)
        .then(resp => resp.json())
        .then(data => {
          if (!data.message) {
            login(data);
          }
        })
    }
  }, [])

  const login = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('user_id', user.id);
  }

  const logout = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
    setCharacters([]);
    localStorage.removeItem('user_id');
    navigate("/")
  }

  const renderLoggedIn = () => {
    if (isLoggedIn) {
      return (
        <>
          <div>You are logged in as { currentUser.username }</div>
          <button onClick={ logout }>Logout</button>
        </>
      )
    }
  }

// APP SECTION
  useEffect(() => {
    fetch(`http://localhost:9292/users`)
      .then(r => r.json())
      .then(users => setUsers(users))
    }, []);


  return (
    <div className='h-screen'>
      {/* <div>
          { isLoggedIn ? renderLoggedIn() : <><Login login={login} /><Signup login={login} users={users} setUsers={setUsers} /></> }
      </div> */}
      <Routes>
        <Route 
          path={`/character-creation`} 
          element={ 
            <CharacterForm 
              users={users} 
              setUsers={setUsers} 
              playerAddingTo={playerAddingTo} 
              setPlayerAddingTo={setPlayerAddingTo}
            /> 
          } 
        />
        <Route 
          exact path="/" 
          element={ 
            <HomePage login={login} users={users} setUsers={setUsers}/> 
          }
        />
        <Route 
          exact path="/my-characters" 
          element={ 
            <Home
              users={users} 
              characters={characters} 
              setCharacters={setCharacters} 
              setPlayerAddingTo={setPlayerAddingTo} 
            /> 
          }
        />
      </Routes>
    </div>
  );
}

export default App;
