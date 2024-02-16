
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/userSlice";


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token,
            },
          });
          if (response.ok) {
            const data = await response.json();
            dispatch(login(data)); 
            navigate('/home');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUser();
  }, [dispatch, navigate]);


  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        const response = await fetch('https://dummyjson.com/auth/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
            })
        });
        
        if (!response.ok) {
            alert('Password or username is incorrect');
            throw new Error('Failed to login');
            
        }
        const data = await response.json();
        const { token } = data;
        localStorage.setItem('token', token);
        dispatch(login(data));
        navigate('/home');
    } catch (error) {
        console.error('Login failed:', error);
        
    }
};

  return (
    <div className="flex justify-center  items-center h-screen ">
      <form className="bg-white shadow-md w-[450px] h-[360px] rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <h1 className='text-center mt-1 mb-6 text-3xl font-bold '>Login</h1>
          <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="username">
            Username:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-4 focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="password">
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center mt-2 justify-between ml-[150px] ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
