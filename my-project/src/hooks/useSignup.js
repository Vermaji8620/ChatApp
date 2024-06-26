import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    gender,
    confirmPassword,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      gender,
      confirmPassword,
    });

    if (!success) return;
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          gender,
          confirmPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Signup failed");
        return;
      }

      const data = await res.json();
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};

const handleInputErrors = ({
  fullName,
  username,
  password,
  gender,
  confirmPassword,
}) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("password must be atleast 6 characters long");
    return false;
  }
  return true;
};

export default useSignup;
