import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Home({login}) {
    const [signUp, setSignUp] = useState(false)
    const [username, setUsername] = useState("")
     const [signUpmessage, setMessage] = useState([]);

    const [details, setUserDetails] = useState({
    username: "",
    password: null
  });

  const navigate = useNavigate()

   const handleLogin = e => {
    e.preventDefault();
    fetch('http://localhost:9292/login', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"        
      },
      body: JSON.stringify({ username })
    })
      .then(resp => resp.json())
      .then(data => {
        if(!data.message) {
          login(data)
          navigate('/my-characters')
          localStorage.setItem('user', username )
        } else if (data.message) {
          alert(data.message)
        }
      })
  }


 function handleSubmit(e) {
     e.preventDefault();
    console.log(details)
    fetch('http://localhost:9292/signup', {
      method: "POST",
      headers: {
        "Accept": "Application/JSON",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    })
    .then(resp => resp.json())
    .then(data => {
       console.log(data)
      if (!data.message) {
        setMessage('Sign up success')
        alert('Sign up success. Please login')
        setSignUp(false)
      } else if (data.message) {
        setSignUp(false)
        alert(data.message)
      }
    })
    .then(setUserDetails({username: ""}))
  }
    return (
    <div className="relative overflow-hidden h-screen">
      <main>
        <div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden h-screen">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div className="lg:py-24">
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block">Explore your imaginations</span>
                    <span className="block text-indigo-400">Build characters</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    
                  </p>
                  <div className="mt-10 sm:mt-12">
                    <form className="sm:mx-auto sm:max-w-xl lg:mx-0" onSubmit={ signUp ? handleSubmit : handleLogin }>
                      <div className="sm:flex">
                        <div className="min-w-0 flex-1">
                          <label htmlFor="email" className="sr-only">
                            Username
                          </label>
                          {
                            signUp ? <input
                            onChange={ e => setUserDetails({username: e.target.value}) }
                            value= {details.username}
                            id="email"
                            type="username"
                            placeholder="Enter your username"
                            className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                          /> : <input
                            onChange={ e => setUsername(e.target.value) }
                            value={username}
                            id="email"
                            type="username"
                            placeholder="Enter your username"
                            className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                          />
                          }
                          
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                          <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-500 py-3 px-4 font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                          >
                            {signUp ? 'Create account': 'Login'}
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                         Dont have an account
                        <span onClick={() => setSignUp(true)} href="#" className="font-medium text-white ml-2 cursor-pointer hoover:text-blue-800">
                          Create one
                        </span>
                        .
                      </p>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                  <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    )
};

export default Home
