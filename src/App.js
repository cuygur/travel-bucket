import React, {useState, useEffect} from 'react';
import db from './firebaseConfig'
import './App.css';

function App() {
  const [header, setHeader] = useState('initial');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState("");
  const [users, setUsers] = useState([])

  const fetchData = async ()=> {
    const res = await db.collection('bucketdemo').doc('header').get()
    const data = res.data()
    console.log(data);
    setHeader(data.title)
     
  }

  const addUser = e => {
    e.preventDefault()
    db.collection('users').doc(fullname).set({
      fullName: fullname,
      email: email,
      array: [fullname, email]
    })
    setEmail("")
    setFullname("")
  }

  useEffect(()=>{
    fetchData()
  },[email])

  return (
    <>
      <h1>{header}</h1>
      <form onSubmit={addUser}>
        <input
          type="text"
          name="fullname"
          placeholder="Full name"
          onChange={e => setFullname(e.target.value)}
          value={fullname}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>users</h4>
      {users.map(user => <div><span>Full Name: {user.fullName} </span><span>Email: {user.email} </span></div>)}
      </>
      );
  }

export default App;
