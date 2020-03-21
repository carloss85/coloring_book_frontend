import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function Auth() {
  const {user} = useSelector(state => state.auth);
  
  const [login, setLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });

  const dispatch = useDispatch();
  let history = useHistory();

  
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    const endpoint = login ? '/login' : '/users';
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    };
    fetch(`http://localhost:3000/${endpoint}`, config)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
          return
        }
        dispatch({
          type: 'SET_USER',
          payload: data
        });
        history.push("/mygallery")
      });
  }

  function changeFormButton() {
    return login ? (
      <button onClick={() => setLogin(false)}>New here? Sign up</button>
    ) : (
      <button onClick={() => setLogin(true)}>
        Already have an account? Log in
      </button>
    );
  }
  return (
    <div>
      <h2>{login ? 'Login' : 'Sign Up'}</h2>
      <div className="form-page">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            style={{marginBottom: "10px"}}
            className="input"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="input"
          />
          <input type="submit" style={{marginTop: "20px", maxWidth: "70px"}}/>
        </form>
        <hr style={{marginLeft: "10%", width: "80%"}}/>
        <div id="change-form-button">
          {changeFormButton()}
        </div>
      </div>
    </div>
  );
}