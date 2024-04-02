import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { login, loading } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
      <div className="h-full w-full bg-purple-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-400">ChatApp</span>
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="label-text text-base">UserName</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="w-full input input-bordered h-10"
            />
          </div>

          <div className="">
            <label htmlFor="" className="label p-2">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full input input-bordered h-10"
            />
          </div>

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?{" "}
          </Link>

          <div className="">
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
