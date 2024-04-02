import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenandSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ error: "invalid credentiaaaaaaaaaals" });
    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) return res.status(401).json({ error: "invalid credentials" });

    generateTokenandSetCookie(user._id, res);
    res.status(201).json({
      username: user.username,
      fullName: user.fullName,
      gender: user.gender,
    });
  } catch (error) {
    console.log("error occured in login ----->>", error.message);
    res.status(500).json({
      error: "Error in login",
    });
  }
};

export const logout = (req, res) => {
  try {
    res
      .cookie("jwt", "", { maxAge: 0 })
      .status(201)
      .json({ message: "user logged out" });
  } catch (error) {
    console.log("error occured in logout ----->>", error.message);
    res.status(500).json({
      message: "Error in logout",
    });
  }
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

    generateTokenandSetCookie(u._id, res);
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
