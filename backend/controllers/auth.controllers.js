import genToken from "../config/token.js"
import User from "../models/users.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
  try {
    let { firstName, lastName, email, userName, password } = req.body

    if (!firstName || !lastName || !email || !userName || !password) {
      return res.status(400).json({ msg: "All fields are required" })
    }

    let exist_email = await User.findOne({ email })
    if (exist_email) {
      return res.status(400).json({ msg: "E-mail already exist" })
    }

    let exist_userName = await User.findOne({ userName })
    if (exist_userName) {
      return res.status(400).json({ msg: "UserName already exist" })
    }

    let hashPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      firstName,
      lastName,
      email,
      userName,
      password: hashPassword,
    })

    let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return res.status(201).json({
      msg: "User is created",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
      },
    })
  } catch (error) {
    console.error("signUp error:", error)
    return res.status(500).json({ msg: error.message || "signUp error" })
  }
}

export const signIn = async (req, res) => {
  try {
    let { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" })
    }

    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: "user doesnot exist" })
    }

    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: "inncorrect password" })
    }

    let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return res.status(200).json({
      msg: "user logedIn",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
      },
    })
  } catch (error) {
    console.error("signIn error:", error)
    return res.status(500).json({ msg: "signIn error" })
  }
}

export const signout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    return res.status(200).json({ msg: "loged out successfully" })
  } catch (error) {
    console.error("signout error:", error)
    return res.status(500).json({ msg: "error while signout" })
  }
}

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ msg: "Not authenticated" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SEC)
    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired session" })
  }
}