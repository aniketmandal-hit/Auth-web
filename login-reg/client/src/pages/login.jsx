import { useState, useContext } from "react";
import logo from "../assets/navLogo.png";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext.jsx";
import axios from 'axios'
import { toast } from 'react-toastify';



const login = () => {
  const [state, setstate] = useState("Signup");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {backendUrl, setIsLoggedin} = useContext(AppContent)


  
const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      //for signup
      if (state === 'Signup') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { username, email, password });
        
        if (data.success) {
          setIsLoggedin(true);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } //for login
       else {
     
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });
        
        if (data.success) {
          setIsLoggedin(true);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {

      toast.error(error.message);
    }
  };
  return (
    <div className="flex h-screen w-full  bg-linear-to-br from-purple-700 to-emerald-800 items-center justify-center">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="absolute flex-none cursor-pointer h-20 w-20 rounded-full overflow-hidden top-5 left-5 bg-amber-50"
      >
        <img
          className="overflow-hidden object-cover h-full w-full"
          src={logo}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5 absolute rounded-3xl bg-linear-to-br from-purple-500 to-emerald-300 h-auto w-fit items-center justify-center p-9">
        <h1 className="font-bold text-3xl mt-0">
          {state === "Signup" ? "Create account" : "Login acoount"}
        </h1>
        <h1 className="font-semibold text-sm ">
          {state === "Signup" ? "Create your account" : "Login to your account"}
        </h1>
        <form
          onSubmit={(e) => {
          onSubmitHandler(e);
          }}
          className="flex items-center justify-center gap-4 flex-col"
        >
          {state === "Signup" && (
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className=" w-65 h-7 outline-0  bg-linear-to-br from-white to-gray-400 rounded-xl "
              type="username"
              value={username}
              placeholder="username"
            />
          )}
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-65 h-7 outline-0 bg-linear-to-br from-white to-gray-400 rounded-xl "
            type="email"
            value={email}
            placeholder="email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-65 font-medium h-7 outline-0 bg-linear-to-br from-white to-gray-400 rounded-xl "
            type="password"
            value={password}
            placeholder="password"
          />
          <p
            onClick={() => {
              navigate("/ResetPassword");
            }}
            className="text-xs cursor-pointer text-blue-900 left-0 w-63 underline "
          >
            Forgot password?
          </p>
          <button className=" cursor-pointer bg-linear-to-br from-white to-gray-400 rounded-2xl w-65 h-7 flex items-center justify-center ">
            {state}
          </button>
        </form>
        <div>
          {state === "Signup" ? (
            <p
              onClick={() => {
                setstate("Login");
              }}
              className="text-xs "
            >
              Already have an account?{" "}
              <span className="cursor-pointer text-blue-900 underline">
                {" "}
                Login
              </span>
            </p>
          ) : (
            <p
              onClick={() => {
                setstate("Signup");
              }}
              className="text-xs "
            >
              Dont have an account?{" "}
              <span className="cursor-pointer text-blue-900 underline">
                {" "}
                Signup
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default login;
