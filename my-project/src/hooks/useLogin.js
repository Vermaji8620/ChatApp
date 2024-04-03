import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    if (!handleInputErrors(username, password)) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Not able to login");
        return;
      }

      const data = await res.json();
      console.log(data);
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

const handleInputErrors = (username, password) => {
  if (!username || !password) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("password must be atleast 6 characters long");
    return false;
  }
  return true;
};

export default useLogin;
