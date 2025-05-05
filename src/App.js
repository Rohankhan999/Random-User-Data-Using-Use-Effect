import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [loading, Setloading] = useState(true);
  const [users, Setusers] = useState([]);
  const [error, Seterror] = useState(null);

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=120")
      .then(response => {
        Setusers(response.data.results);
        Setloading(false);
      })
      .catch(error => {
        Seterror(error);
        Setloading(false);
      })
  }, []);
  if (loading) return <p>Loading....</p>
  if (error) return <div>Error: {error.message}</div>
  return (
    <div className='body'>

      <h1 style={{textAlign:"center", padding:"20px"}}>Random User List</h1>
      <ul style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", margin: "auto" }}>
        {users.map(user => (
          <li style={{ border: "2px Solid black", listStyle: "none", width: "300px", padding: "20px"  }} key={user.login.uuid}   onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0px 8px 20px rgba(255, 255, 255, 0.3)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 0 0px rgba(9, 142, 224, 0)";
          }}>
            <img src={user.picture.thumbnail} alt={user.name.first} style={{ width: "100px" }} />
            <h3>{user.name.first} {user.name.last}</h3>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
