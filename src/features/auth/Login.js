import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from '../../hooks/usePersist'
import PacmanLoader from 'react-spinners/PacmanLoader'


const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response');
    } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
    } else if (err.status === 401) {
        setErrMsg('Unauthorized');
    } else {
        setErrMsg(err.data?.message);
    }
    errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <PacmanLoader color="#ed043a"
  loading
  size={49}
  speedMultiplier={-6}
/>

  const content = (
    <section class="my-3">
      <header>
        <h1 class="text-amber-300 font-bold text-5xl py-2 mx-2" >Spectrum Employee Login 👨‍🔧</h1>
      </header>
      <main >
      <p class="text-amber-300">___________________________________________________________________________________</p>
      <p class="text-amber-300">___________________________________________________________________________________</p>
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form 
          class="text-white mx-2" 
          onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label><br />
          <input
            class="text-black py-2 px-7 rounded-full my-2 "
            type="text"
            id="username"
            placeholder="Username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          /><br />

          <label htmlFor="password">Password:</label><br />
          <input
          class="text-black py-2 px-7 rounded-full my-2 "
            type="password"
            id="password"
            placeholder="Password"
            onChange={handlePwdInput}
            value={password}
            required
          /><br />
          <button class="bg-gray-300 text-blue-700 hover:bg-green-400 hover:text-white px-4 ml-44 rounded-md my-3 ">Sign In</button>


          <label htmlFor="persist" className=" flex items-center max-w-full gap-2">
                        <input
                            type="checkbox"
                            class="w-6 h-6"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                    
        </form>
        <p class="text-amber-300">___________________________________________________________________________________</p>
        <p class="text-amber-300">___________________________________________________________________________________</p>
      </main>
      
      <footer>
            <div >
                <Link to="/" class=" mb-5 absolute bottom-0 left-0  ..."> <button type="button" class="inline-block px-6 py-2.5 bg-white
                 text-blue-700 font-bold text-lg leading-tight uppercase rounded shadow-md hover:text-black hover:bg-green-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Home Page</button></Link>
                </div>
            </footer>
    </section>
  );

  return content;
};
export default Login;