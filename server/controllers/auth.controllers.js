
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ===================================
// Testing API
// ===================================
export const testingAPI = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "API running"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ===================================
// Register User API
// ===================================
export const registerUser = async (req, res) => {
  try {

    // 1. Get data from frontend
    const { name, email, password } = req.body;

    // 2. Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory"
      });
    }

    // 3. Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // 4. Check existing user
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create user in MongoDB
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    // 7. Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 8. Send response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token
    });

  } catch (error) {
    console.log(error, "in register user");

    return res.status(500).json({
      success: false,
      message: "Internal Server Error!"
    });
  }
};


// ===================================
// Login User API
// ===================================
export const loginUser = async (req, res) => {
  try {

    // 1. Get data from frontend
    const { email, password } = req.body;

    // 2. Check all fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields"
      });
    }

    // 3. Find user in MongoDB
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      });
    }

    // 4. Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password"
      });
    }

    // 5. Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 6. Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error, "in login user");

    return res.status(500).json({
      success: false,
      message: "Internal Server Error!"
    });
  }
};
