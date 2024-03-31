import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // iska mtlb hai ki sirf http request ke through hi cookie access ho sakta hai
    sameSite: "strict", // iska yeah mtlb hai ki agar frontend and backend dono same domain pe hai toh hi cookie send hoga
  });
};

export default generateTokenandSetCookie;
