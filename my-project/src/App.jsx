import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route element={authUser ? <Home /> : <Login />} path="/" />
        <Route
          element={authUser ? <Navigate to="/" /> : <Login />}
          path="/login"
        />
        <Route
          element={authUser ? <Navigate to="/" /> : <Signup />}
          path="/signup"
        />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;
