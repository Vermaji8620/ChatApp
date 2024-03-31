import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenandSetCookie from "../utils/generateToken.js";

export const login = (req, res) => {
  res.send("login doeeeeeeeeee");
};

export const logout = (req, res) => {
  res.send("logut working ");
};

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ error: "passwords do not match" });
    }

    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    // hash the passsword here
    const salting = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salting);
    const profilePic = `https:avatar.iran.liara.run/username?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    });
    const u = await newUser.save();

    generateTokenandSetCookie(u, res);
    res.status(201).json({
      _id: u._id,
      fullName: u.fullName,
      username: u.username,
      profilePic: u.profilePic,
    });
  } catch (error) {
    console.log("error occured in signup controller-- > ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
